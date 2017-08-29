$(function () {
    $(function () {
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
        //---------------------------------------------------------------------Video------------------------------------------------------------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
        $.fn[window.videoTranslations[document.lang]] = function (options) {
            // Establish our default settings
            var settings = $.extend({
                [window.titleTranslations[document.lang]]: null,
                [window.sourceTranslations[document.lang]]: null,
                [window.nameTranslations[document.lang]]: null,
                [window.widthTranslations[document.lang]]: null,
                [window.lengthTranslations[document.lang]]: null,
                [window.animationTranslations[document.lang]]: null,
                [window.transparencyTranslations[document.lang]]: null,
                [window.distanceFromBottomTranslations[document.lang]]: null,
                [window.distanceFromTopTranslations[document.lang]]: null,
                [window.distanceFromLeftTranslations[document.lang]]: null,
                [window.distanceFromRightTranslations[document.lang]]: null,
                [window.positionTranslations[document.lang]]: null,
                [window.containerTranslations[document.lang]]: null,
                [window.backgroundTranslations[document.lang]]: null,
                [window.commandsTranslations[document.lang]]: null
            }, options);
            return this.each(function () {
                var name = settings[window.nameTranslations[document.lang]];
                var source = settings[window.sourceTranslations[document.lang]];
                var out = '<div id="' + name + '_container" style="position: relative; overflow: hidden;"> \
						<video id="' + name + '" crossorigin="anonymous" style="-webkit-filter: blur(10px); background: black;" preload="auto" /> \
						<div id="showVideo_' + name + '_containerA"> \
						<button id="video_' + name + '_mainButton" class="videoMainButton" onclick="showVideoA(\'' + name + '\', \'' + source + '\');"> \
						<i class="material-icons">play_arrow</i> Loading...</button></div> \
						<div id="showVideo_' + name + '_containerB" style="display: none;"> \
						<p style="position: relative; color: #FFFFFF; top: 20%; left: 50%; transform: translate(-50%, -50%);">Nudes found</p> \
						<button style="position: relative; top: 65%; left: 50%; background-color: silver; opacity: 0.5; border-radius: 100px; border: 5px solid; color: #FFFFFF; max-width: 200px; max-height: 60px; width: 50%; height: 30%; transform: translate(-50%, -50%);" onclick="showVideoB(\'' + name + '\');">Continue</button></div>';
                if (settings[window.containerTranslations[document.lang]]) {
                    if ($('#' + settings[window.containerTranslations[document.lang]] + '').hasClass('modal')) {
                        $('#' + settings[window.containerTranslations[document.lang]] + ' > .modal-content').append(out);
                    } else {
                        $('#' + settings[window.containerTranslations[document.lang]] + '').append(out);
                    }
                } else {
                    $('contents').append(out);
                }
                window.verifyDataURL(source, function (data) {
                    if (data == 'not exist') {
                        window.getFileSize(source, function (size) {
                            $('#video_' + name + '_mainButton').html('<i class="material-icons">play_arrow</i> ' + size);
                        });
                    } else if (data == 'exists') {
                        window.showVideoA(name, source);
                    }
                });
                if (settings[window.backgroundTranslations[document.lang]]) {
                    window.setBG(name, settings[window.backgroundTranslations[document.lang]]);
                }
                if (settings[window.videoWidthTranslations[document.lang]]) {
                    $('#' + name + '').attr('width', settings[window.imageWidthTranslations[document.lang]]);
                }
                if (settings[window.videoLengthTranslations[document.lang]]) {
                    $('#' + name + '').attr('length', settings[window.videoLengthTranslations[document.lang]]);
                }
                if (settings[window.titleTranslations[document.lang]]) {
                    $('#' + name + '').attr('alt', settings[window.titleTranslations[document.lang]]);
                }
                if (settings[window.widthTranslations[document.lang]]) {
                    window.setDimension(name, 'width', settings[window.widthTranslations[document.lang]], 'vid');
                }
                if (settings[window.lengthTranslations[document.lang]]) {
                    window.setDimension(name, 'length', settings[window.lengthTranslations[document.lang]], 'vid');
                }
                if (settings[window.distanceFromBottomTranslations[document.lang]]) {
                    window.setDistance(name + '_container', 'bottom', settings[window.distanceFromBottomTranslations[document.lang]]);
                }
                if (settings[window.distanceFromTopTranslations[document.lang]]) {
                    window.setDistance(name + '_container', 'top', settings[window.distanceFromTopTranslations[document.lang]]);
                }
                if (settings[window.distanceFromLeftTranslations[document.lang]]) {
                    window.setDistance(name + '_container', 'left', settings[window.distanceFromLeftTranslations[document.lang]]);
                }
                if (settings[window.distanceFromRightTranslations[document.lang]]) {
                    window.setDistance(name + '_container', 'right', settings[window.distanceFromRightTranslations[document.lang]]);
                }
                if (settings[window.commandsTranslations[document.lang]]) {
                    window.execute(name, settings[window.commandsTranslations[document.lang]]);
                }
                if (settings[window.animationTranslations[document.lang]]) {
                    window.setAnimation(name, settings[window.animationTranslations[document.lang]]);
                }
                if (settings[window.transparencyTranslations[document.lang]]) {
                    $('#' + name + '').css('-webkit-filter', 'opacity(' + settings[window.transparencyTranslations[document.lang]] + '%)');
                }
            });
        };
    });
}(jQuery));