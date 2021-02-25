const codegenPath = 'src/graphql/';

import { execSync } from 'child_process';

async function customize(moduleName) {
	const modulePath = '../' + codegenPath + moduleName + '.js';
	const moduleCustomizationPath = '../' + codegenPath + 'custom-' + moduleName + '-description.js';
	const newModulePath = './' + codegenPath + 'custom-' + moduleName + '.js';

	const fs = await import('fs');
	// let module = fs.readFileSync(modulePath, 'utf8');
	// console.log(module.split(/.*`;/));

	const module = await import( modulePath);
	const moduleCustomization = (await import (moduleCustomizationPath)).default;
	let outString = '';
	for (let func in module) {
		outString += 'export const ' + func + ' = `' + module[func] + '`;\n';
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
			}
		}
		outString += 'export const ' + desc.name + ' = `' + query + '`;\n';
	}

	fs.writeFileSync(newModulePath, outString);
	console.log(newModulePath + ': OK');
}

execSync("amplify codegen");
customize('queries');
customize('mutations');
customize('subscriptions');
