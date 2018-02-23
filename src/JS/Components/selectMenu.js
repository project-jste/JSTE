/*!
 * Select Menu
 * https://project-jste.github.io/
 *
 * Copyright 2017 Jste Team
 * Released under the GNU AGPLv3 license
 * https://project-jste.github.io/license
 *
 * Date: 2018-02-05
 */
$(function () {
    function selectMenuFn(el, settings) {
        el.each(function () {
            var name = elementSettingsAnalyze(settings, 'name');
            var out = '<div id="' + name + '_container" class="input-field"> \
                        <select id="' + name + '">';
            if (elementSettingsAnalyze(settings, 'title')) {
                out += '<option value="" disabled selected>' + window.chooseTranslations[document.langID] + ' ' + elementSettingsAnalyze(settings, 'title') + '</option>';
            } else {
                out += '<option value="" disabled selected>' + window.chooseTranslations[document.langID] + '</option>';
            }
            if (elementSettingsAnalyze(settings, 'items')) {
                if (elementSettingsAnalyze(settings, 'items').includes(window.inTheGroupTranslations[document.langID])) {
                    var itemsGroups = elementSettingsAnalyze(settings, 'items').split(' &amp;&amp;&amp;&amp; ');
                    for (a = 0; a < itemsGroups.length; a++) {
                        if (itemsGroups[a].includes(window.inTheGroupTranslations[document.langID])) {
                            var items = itemsGroups[a].split(' ' + window.inTheGroupTranslations[document.langID])[0].split(' &amp;&amp;&amp; ');
                            out += '<optgroup label="' + itemsGroups[a].split(' ' + window.inTheGroupTranslations[document.langID])[1] + '">'
                            for (i = 0; i < items.length; i++) {
                                out += '<option value="' + items[i] + '">' + items[i] + '</option>';
                            }
                            out += '</optgroup>';
                        } else {
                            var items = itemsGroups[a].split(' &amp;&amp;&amp; ');
                            for (i = 0; i < items.length; i++) {
                                out += '<option value="' + items[i] + '">' + items[i] + '</option>';
                            }
                        }
                    }
                } else {
                    var items = elementSettingsAnalyze(settings, 'items').split(' &amp;&amp;&amp; ');
                    for (i = 0; i < items.length; i++) {
                        out += '<option value="' + items[i] + '">' + items[i] + '</option>';
                    }
                }
            }
            if (elementSettingsAnalyze(settings, 'title')) {
                out += '</select><label>' + elementSettingsAnalyze(settings, 'title') + '</label></div>';
            } else {
                out += '</select></div>';
            }
            window.appendComponent(elementSettingsAnalyze(settings, 'container'), out);
            if (elementSettingsAnalyze(settings, 'attributes')) {
                var propertiesArray = elementSettingsAnalyze(settings, 'attributes').split(' ' + window.andTranslations[document.langID] + ' ');
                for (i = 0; i < propertiesArray.length; i++) {
                    if (propertiesArray[i].findBestMatch(window.wordsTranslationsDB.Words['disabled'][document.langCode]).rating > 0.8) {
                        $('#' + name + '').attr('disabled', '');
                    }
                }
            }
            if (elementSettingsAnalyze(settings, 'position')) {
                $('#' + name + '_container').css('position', elementSettingsAnalyze(settings, 'position'));
            } else {
                $('#' + name + '_container').css('position', 'relative');
            }
            $('#' + name + '').select();
            if (document.langID == 3 || document.langID == 4) {
                $('#' + name + '_container > .select-wrapper > .caret').css('right', '97%');
                $('#' + name + '_container > label').css('right', '0px');
            }
            window.propSet(name + '_container', settings);
        });
    }
    var selectMenuTranslations = window.wordsTranslationsDB.Words['selectMenu'][document.langCode];
    for (var i = 0; i < selectMenuTranslations.length; i++) {
        $.fn[selectMenuTranslations[i]] = function (settings) {
            selectMenuFn(this, settings);
        };
    }
});