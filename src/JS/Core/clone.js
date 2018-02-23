/*!
 * Clone
 * https://project-jste.github.io/
 *
 * Copyright 2017 Jste Team
 * Released under the GNU AGPLv3 license
 * https://project-jste.github.io/license
 *
 * Date: 2017-09-6
 */
$(function () {
    function cloneFn(el, settings) {
        el.each(function () {
            var clonedElement = elementSettingsAnalyze(settings, 'clonedElement');
            var name = elementSettingsAnalyze(settings, 'name');
            var out = $('#' + clonedElement + '').clone(false).attr('id', name);
            if (elementSettingsAnalyze(settings, 'attributes')) {
                var propertiesArray = elementSettingsAnalyze(settings, 'attributes').split(' ' + window.andTranslations[document.langID] + ' ');
                for (i = 0; i < propertiesArray.length; i++) {
                    if (propertiesArray[i].findBestMatch(window.wordsTranslationsDB.Words['withCommands'][document.langCode]).rating > 0.8) {
                        out = $('#' + clonedElement + '').clone(true).attr('id', name);
                    }
                }
            }
            if (elementSettingsAnalyze(settings, 'container')) {
                if ($('#' + elementSettingsAnalyze(settings, 'container') + '').hasClass('modal')) {
                    $('#' + elementSettingsAnalyze(settings, 'container') + ' > .modal-content').append(out);
                } else {
                    $('#' + elementSettingsAnalyze(settings, 'container') + '').append(out);
                }
            } else {
                $('contents').append(out);
            }
            if (elementSettingsAnalyze(settings, 'text')) {
                $('#' + name + '').text(elementSettingsAnalyze(settings, 'text'));
            }
            if (elementSettingsAnalyze(settings, 'fontColor')) {
                window.setFontColour(name, elementSettingsAnalyze(settings, 'fontColor'));
            }
            if (elementSettingsAnalyze(settings, 'fontStyle')) {
                $('#' + name + '').css('font-style', elementSettingsAnalyze(settings, 'fontStyle'));
            }
            if (elementSettingsAnalyze(settings, 'fontThickness')) {
                if (window.getSafe(() => elementSettingsAnalyze(settings, 'fontThickness').findBestMatch(window.wordsTranslationsDB.Words['thick'][document.langCode]).rating > 0.8)) {
                    $('#' + name + '').css('font-weight', 'bold');
                } else {
                    $('#' + name + '').css('font-weight', elementSettingsAnalyze(settings, 'fontThickness'));
                }
            }
            if (elementSettingsAnalyze(settings, 'fontSize')) {
                $('#' + name + '').css('font-size', window.convertLengthCSS(elementSettingsAnalyze(settings, 'fontSize')));
            }
            if ($('#' + elementSettingsAnalyze(settings, 'container') + '').hasClass('row') == true) {
                $('#' + name + '').addClass('col');
            }
            window.propSet(name, settings);
            if (!elementSettingsAnalyze(settings, 'width')) {
                $('#' + name + '').css('width', 'auto');
            }
        });
    }
    var cloneFnTranslations = window.wordsTranslationsDB.Words['cloneFn'][document.langCode];
    for (var i = 0; i < cloneFnTranslations.length; i++) {
        $.fn[cloneFnTranslations[i]] = function (settings) {
            cloneFn(this, settings);
        };
    }
});