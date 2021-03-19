const codegenPath = 'src/graphql/';

import { execSync } from 'child_process';

async function customize(moduleName) {
	const modulePath = '../' + codegenPath + moduleName + '.js';
	const moduleCustomizationPath = '../' + codegenPath + 'custom-' + moduleName + '-description.js';
	const newModulePath = './' + codegenPath + 'custom-' + moduleName + '.js';

	const module = await import(modulePath);
	const moduleCustomization = (await import(moduleCustomizationPath)).default;

	let outString = '/* eslint-disable */\n';
	outString += '// This is an auto generated file and will be overwritten with codegen.\n';
	outString += '// DO NOT EDIT.\n';
	outString += '// Please use custom-' + moduleName + '-description.js for editing.\n\n';

	for (let func in module) {
		let query = module[func];
		query = query.replace(/ {2}/g, '\t');
		outString += 'export const ' + func + ' = `' + query + '`;\n';
	}

	outString += '\n// --------- Custom ---------\n\n';

	for (let desc of moduleCustomization) {
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
		outString += 'export const ' + desc.name + ' = `' + query + '`;\n';
	}

	const fs = await import('fs');
	fs.writeFileSync(newModulePath, outString);
	console.log(newModulePath + ': OK');
}

execSync('amplify codegen');
customize('queries');
customize('mutations');
// customize('subscriptions');
