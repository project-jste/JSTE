/*!
 * NaturalScript Main Analyzer
 * https://project-jste.github.io/
 *
 * Copyright 2018 Jste Team
 * Released under the GNU AGPLv3 license
 * https://project-jste.github.io/license
 *
 * Date: 2018-03-10
 */

const importRS = require.context('translations', true, /\.rive$/)
import getTranslations from 'core/translationsGet'
import codeAnalyzer from 'codeAnalyzer/rivescript'
import parseCondition from 'parsers/conditions'
import parseMs from 'parsers/ms'
import {
    componentsDB
} from 'core/wordsTranslationsInit'
import * as declarations from 'core/declarations'
export let operatorsDB = []
export let conditionsDB = []
export let commandUtilsDB = []
export let normalTxtOperatorTranslations = []
var bot = new codeAnalyzer()
if (declarations.langCode) {
    bot.stream([importRS(`./commands/${declarations.langCode}.rive`), importRS(`./commandsUtils/${declarations.langCode}.rive`), importRS(`./componentInit/${declarations.langCode}.rive`), importRS(`./events/${declarations.langCode}.rive`), importRS(`./operators/${declarations.langCode}.rive`), importRS(`./conditions/${declarations.langCode}.rive`)])
    for (const i of bot.deparse().topics.random) {
        if ((/^id: O\d+.*$/).test(i.reply[0])) {
            operatorsDB.push(bot.brain.triggerRegexp('user', i.trigger))
        } else if ((/^id: Co\d+.*$/).test(i.reply[0])) {
            conditionsDB.push(bot.brain.triggerRegexp('user', i.trigger))
        } else if ((/^id: CU\d+.*$/).test(i.reply[0])) {
            commandUtilsDB.push(bot.brain.triggerRegexp('user', i.trigger))
        } else if ((/^id: O19.*$/).test(i.reply[0])) {
            normalTxtOperatorTranslations.push(bot.brain.triggerRegexp('user', i.trigger))
        }
    }
}
bot.setVariable('components', componentsDB.join('|'))
export default function analyze(commandRaw) {
    bot.sortReplies()
    let reply = bot.reply('local-user', commandRaw.replace(/\n/gmi, '<<br>>').replace(/\t/gmi, '<<tab>>'));
    if (reply == 'ERR: No Reply Matched') {
        return false
    }
    let command = reply.split(' ==> ')
    let analysisResult = {}
    command.forEach(entity => {
        const processedEntity = /(.*?): (.*)/.exec(entity)
        if (!processedEntity[1].includes('undefined')) {
            analysisResult[processedEntity[1]] = processedEntity[2].replace(/<<br>>/gmi, '\n').replace(/<<tab>>/gmi, '\t')
        }
    })
    if (analysisResult.id.match(/S\d+/)) {
        return `runCommand('./${analysisResult.id}.js').default({elementName, parentFnParams, scopes, ...${JSON.stringify(analysisResult)}})`
    } else if (analysisResult.id.match(/E\d+/)) {
        return {
            prefix: `initEvent('./${analysisResult.id}.js').default({parentFnParams, scopes, ...${JSON.stringify(analysisResult)}}, (elementName) => {`,
            suffix: `})`,
            isScope: true
        };
    } else if (analysisResult.id.match(/CI(?!6)\d+/)) {
        return {
            prefix: `manageComponent(${JSON.stringify(analysisResult)}, {`,
            suffix: `}, scopes, parentFnParams)`,
            isScope: false
        }
    } else if (analysisResult.id == 'CI6') {
        return `"${getTranslations(analysisResult.property, true)}": \`${analysisResult.propertyValue.replace(XRegExp('^(.*?)`(.*)$', 'gmi'), '$1\\`$2')}\`,`
    } else if (analysisResult.id == 'CU1') {
        return {
            prefix: `if (${parseCondition(analysisResult.conditions)}) {`,
            suffix: `}`,
            isScope: true
        }
    } else if (analysisResult.id == 'CU2') {
        return {
            prefix: `else if (${parseCondition(analysisResult.conditions)}) {`,
            suffix: `}`,
            isScope: true
        }
    } else if (analysisResult.id == 'CU3') {
        return {
            prefix: `else {`,
            suffix: `}`,
            isScope: true
        }
    } else if (analysisResult.id == 'CU4') {
        return {
            prefix: `setTimeout(() => {`,
            suffix: `}, ${parseMs(analysisResult.period)})`,
            isScope: true
        }
    } else if (analysisResult.id == 'CU5') {
        return {
            prefix: `setInterval(() => {`,
            suffix: `}, ${parseMs(analysisResult.period)})`,
            isScope: true
        }
    } else if (analysisResult.id == 'CU6') {
        return {
            prefix: `NS.functions.${analysisResult.name} = (elementName, parentFnParams) => {`,
            suffix: `}`,
            isScope: true
        }
    } else if (analysisResult.id == 'CU7') {
        return {
            prefix: `NS.styles.${analysisResult.name} = {`,
            suffix: `}`,
            isScope: false
        }
    } else if (analysisResult.id == 'CU8') {
        return {
            prefix: `.then(${analysisResult.varName} => {`,
            suffix: `})`,
            isScope: true,
            varName: analysisResult.varName
        }
    } else if (analysisResult.id == 'CU9') {
        return {
            prefix: `for (const ${analysisResult.varName} of getVar(\`${analysisResult.listName}\`, scopes, parentFnParams)) {`,
            suffix: `}`,
            isScope: true,
            varName: analysisResult.varName
        }
    } else {
        return analysisResult
    }
}