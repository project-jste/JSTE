$(function () {
    $(function () {
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
        //---------------------------------------------------------------Select Menu------------------------------------------------------------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
        $.fn[window.selectMenuTranslations[document.lang]] = function (options) {
            // Establish our default settings
            var settings = $.extend({
                [window.titleTranslations[document.lang]]: null,
                [window.itemsTranslations[document.lang]]: null,
                [window.rippleTranslations[document.lang]]: null,
                preselected: null,
                [window.disabledTranslations[document.lang]]: null,
                [window.fontColorTranslations[document.lang]]: null,
                [window.fontSizeTranslations[document.lang]]: null,
                [window.nameTranslations[document.lang]]: null,
                [window.widthTranslations[document.lang]]: null,
                [window.lengthTranslations[document.lang]]: null,
                [window.thicknessTranslations[document.lang]]: null,
                [window.fontStyleTranslations[document.lang]]: null,
                [window.animationTranslations[document.lang]]: null,
                [window.transparencyTranslations[document.lang]]: null,
                [window.distanceFromBottomTranslations[document.lang]]: null,
                [window.distanceFromTopTranslations[document.lang]]: null,
                [window.distanceFromLeftTranslations[document.lang]]: null,
                [window.distanceFromRightTranslations[document.lang]]: null,
                [window.positionTranslations[document.lang]]: null,
                [window.containerTranslations[document.lang]]: null,
                [window.backgroundTranslations[document.lang]]: null,
                [window.attributesTranslations[document.lang]]: null,
                [window.commandsTranslations[document.lang]]: null
            }, options);
            return this.each(function () {
                var name = settings[window.nameTranslations[document.lang]];
                var out = '<div class="input-field"> \
						<select id="' + name + '" style="display: block;"> \
						<option value="" disabled selected>Choose your option</option>';
                if (settings[window.itemsTranslations[document.lang]]) {
                    if (settings[window.itemsTranslations[document.lang]].includes(window.inTheGroupTranslations[document.lang])) {
                        var itemsGroups = settings[window.itemsTranslations[document.lang]].split(' &amp;&amp;&amp;&amp; ');
                        for (a = 0; a < itemsGroups.length; a++) {
                            if (itemsGroups[a].includes(window.inTheGroupTranslations[document.lang])) {
                                var items = itemsGroups[a].split(' ' + window.inTheGroupTranslations[document.lang])[0].split(' &amp;&amp;&amp; ');
                                out += '<optgroup label="' + itemsGroups[a].split(' ' + window.inTheGroupTranslations[document.lang])[1] + '">'
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
                    }
                }
                if (settings[window.titleTranslations[document.lang]]) {
                    out += '</select><label>' + settings[window.titleTranslations[document.lang]] + '</label></div>';
                } else {
                    out += '</select></div>';
                }
                if (settings[window.containerTranslations[document.lang]]) {
                    if ($('#' + settings[window.containerTranslations[document.lang]] + '').hasClass('modal')) {
                        $('#' + settings[window.containerTranslations[document.lang]] + ' > .modal-content').append(out);
                    } else {
                        $('#' + settings[window.containerTranslations[document.lang]] + '').append(out);
                    }
                } else {
                    $('contents').append(out);
                }
                if (settings[window.fontColorTranslations[document.lang]]) {
                    window.setFontColour(name, settings[window.fontColorTranslations[document.lang]]);
                }
                if (settings[window.fontStyleTranslations[document.lang]]) {
                    $('#' + name + '').css('font-style', settings[window.fontStyleTranslations[document.lang]]);
                }
                if (settings[window.attributesTranslations[document.lang]]) {
                    var propertiesArray = settings[window.attributesTranslations[document.lang]].split(' &amp;&amp;&amp; ');
                    for (i = 0; i < propertiesArray.length; i++) {
                        if (propertiesArray[i] == window.disabledTranslations[document.lang]) {
                            $('#' + name + '').attr('disabled', '');
                        } else if (propertiesArray[i] == window.rippleTranslations[document.lang]) {
                            $('#' + name + '').attr('noink', '');
                        }
                    }
                }
                if (settings[window.thicknessTranslations[document.lang]]) {
                    if (settings[window.thicknessTranslations[document.lang]] == window.thickTranslations[document.lang]) {
                        $('#' + name + '').css('font-weight', 'bold');
                    } else {
                        $('#' + name + '').css('font-weight', settings[window.thicknessTranslations[document.lang]]);
                    }
                }
                if (settings[window.fontSizeTranslations[document.lang]]) {
                    $('#' + name + '').css('font-size', window.convertLengthCSS(settings[window.fontSizeTranslations[document.lang]]));
                }
                if ($('#' + settings[window.containerTranslations[document.lang]] + '').hasClass('row') == true) {
                    $('#' + name + '').addClass('col');
                }
                if (settings[window.positionTranslations[document.lang]]) {
                    $('#' + name + '').css('position', settings[window.positionTranslations[document.lang]]);
                } else {
                    $('#' + name + '').css('position', 'relative');
                }
                if (settings[window.distanceFromBottomTranslations[document.lang]]) {
                    window.setDistance(name, 'bottom', settings[window.distanceFromBottomTranslations[document.lang]]);
                }
                if (settings[window.distanceFromTopTranslations[document.lang]]) {
                    window.setDistance(name, 'top', settings[window.distanceFromTopTranslations[document.lang]]);
                }
                if (settings[window.distanceFromLeftTranslations[document.lang]]) {
                    window.setDistance(name, 'left', settings[window.distanceFromLeftTranslations[document.lang]]);
                }
                if (settings[window.distanceFromRightTranslations[document.lang]]) {
                    window.setDistance(name, 'right', settings[window.distanceFromRightTranslations[document.lang]]);
                }
                if (settings[window.commandsTranslations[document.lang]]) {
                    window.execute(name, settings[window.commandsTranslations[document.lang]]);
                }
                if (settings[window.widthTranslations[document.lang]]) {
                    window.setDimension(name, 'width', settings[window.widthTranslations[document.lang]]);
                }
                if (settings[window.lengthTranslations[document.lang]]) {
                    window.setDimension(name, 'length', settings[window.lengthTranslations[document.lang]]);
                }
                if (settings[window.backgroundTranslations[document.lang]]) {
                    window.setBG(name, settings[window.backgroundTranslations[document.lang]]);
                }
                if (settings[window.animationTranslations[document.lang]]) {
                    window.setAnimation(name, settings[window.animationTranslations[document.lang]]);
                }
                if (settings[window.transparencyTranslations[document.lang]]) {
                    $('#' + name + '').css('-webkit-filter', 'opacity(' + settings[window.transparencyTranslations[document.lang]] + '%)');
                }
                $('#' + name + '').material_select();
            });
        };
    });
}(jQuery));