const codegenPath = 'src/graphql/';

import { execSync } from 'child_process';
import fs from 'fs';

const getDefinitionsRegex = /^[ \t]+[a-zA-Z_]+(:| *\([a-zA-Z_,\[\] \t!:\n]+\))/gm;
const getNamesRegex = /:| *\([a-zA-Z_,\[\] \t!:\n]+\)/;
const apiGraphqlPath = 'amplify/backend/api/WaisDynamoDB/schema/api.graphql';

function loadAPIFunctionNames() {
	let data;
	try {
		data = fs.readFileSync(apiGraphqlPath, 'utf8');
	} catch (err) {
		console.error(err);
	}
	data = data.match(getDefinitionsRegex);
	for (const i in data) {
		data[i] = data[i].replace(getNamesRegex, '');
		data[i] = data[i].trim();
	}
	return data;
}

async function customize(moduleName) {
	const modulePath = '../' + codegenPath + moduleName + '.js';
	const moduleCustomizationPath = '../' + codegenPath + 'custom-' + moduleName + '-description.js';
	const newModulePath = './' + codegenPath + 'custom-' + moduleName + '.js';

	let module;
	let moduleCustomization;
	try {
		module = await import(modulePath);
	} catch {
		console.error(`No ${moduleName} found.`)
		return;
	}

	try {
		moduleCustomization = (await import(moduleCustomizationPath)).default;
	} catch {
		console.error(`No ${moduleName} found.`)
		return;
	}

	let outString = '/* eslint-disable */\n';
	outString += '// This is an auto generated file and will be overwritten with codegen.\n';
	outString += '// DO NOT EDIT.\n';
	outString += '// Please use custom-' + moduleName + '-description.js for editing.\n\n';

	for (let func in module) {
		if (!customAPIs.includes(func)) {
			continue;
		}
		let query = module[func];
		query = query.replace(/ {2}/g, '\t');
		outString += 'export const ' + func + ' = /* GraphQL */ `' + query + '`;\n';
	}

	outString += moduleCustomization.length ? '\n// --------- Custom ---------\n\n' : '';

	for (let desc of moduleCustomization) {
		if (!customAPIs.includes(desc.name)) {
			continue;
		}
		let query;
		if (desc.graphql !== undefined) {
			query = desc.graphql;
		} else {
			query = module[desc.source];
			for (let field of desc.remove) {
				const regex = new RegExp(' *' + field + '\n');
				query = query.replace(regex, '');
				query = query.replace(/ {2}/g, '\t');
			}
		}
		outString += 'export const ' + desc.name + ' = /* GraphQL */ `' + query + '`;\n';
	}

	const fs = await import('fs');
	fs.writeFileSync(newModulePath, outString);
	console.log(newModulePath + ': OK');
}

const customAPIs = loadAPIFunctionNames();
execSync('amplify codegen');
customize('queries');
customize('mutations');
customize('subscriptions');
