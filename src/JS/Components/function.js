/*!
 * Function
 * https://project-jste.github.io/
 *
 * Copyright 2018 Jste Team
 * Released under the GNU AGPLv3 license
 * https://project-jste.github.io/license
 *
 * Date: 2018-04-19
 */
$(function () {
    function functionFn(settings) {
        settings = window.inheritStyle(settings, elementSettingsAnalyze(settings, 'style'));
        if (elementSettingsAnalyze(settings, "commands")) {
            window.execute(null, elementSettingsAnalyze(settings, "commands"), true, elementSettingsAnalyze(settings, "name"));
        }
    }
    var functionTranslations = window.wordsTranslationsDB.Words['function'][document.langCode];
    for (const i of functionTranslations) {
        window.jsteComponentsFnStore[i] = function (settings) {
            functionFn(settings);
        };
    }
});