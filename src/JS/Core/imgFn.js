//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------Images Related Functions------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function showImageA(name, URLID, source) {
	var nudity = $(`#${name}`).attr('nude');
	var fx = $(`#${name}`).attr('fx');
	if (typeof nudity !== typeof undefined && nudity !== false) {
		if (window.childModeStatus == 'off') {
			if ($('#showImage_' + name + '_containerA').length > 0) {
				window.fadeOut('showImage_' + name + '_containerA');
			}
			window.fadeIn('showImage_' + name + '_containerB');
		} else if (window.childModeStatus == 'on') {
			if ($('#showImage_' + name + '_containerA').length > 0) {
				window.fadeOut('showImage_' + name + '_containerA');
			}
			window.fadeIn('showImage_' + name + '_containerD');
		}
	} else {
		if (window.isLive) {
			window.requestBLOB(name, 'img', source, URLID);
		} else {
			window.requestBLOB(source, URLID, function (BLOBURL) {
				$(`#${name}`).attr('src', BLOBURL);
			});
		}
		$(`#${name}`).on('load', function () {
			window.URL.revokeObjectURL($(`#${name}`).attr('src'));
			$(`#${name}`).css('-webkit-filter', 'blur(0px)');
			if ($('#showImage_' + name + '_containerA').length > 0) {
				window.fadeOut('showImage_' + name + '_containerA');
			}
			if (typeof fx !== typeof undefined && fx !== false) {
				if (fx == 'rain') {
					window.setDimension(name);
				}
			}
		});
	}
}

function showImageB(name, URLID, source) {
	if (window.isLive) {
		window.requestBLOB(name, 'img', source, URLID);
	} else {
		window.requestBLOB(source, URLID, function (BLOBURL) {
			$(`#${name}`).attr('src', BLOBURL);
		});
	}
	$(`#${name}`).on('load', function () {
		window.URL.revokeObjectURL($(`#${name}`).attr('src'));
		window.fadeOut('showImage_' + name + '_containerB');
		window.fadeIn('showImage_' + name + '_containerC');
	});
}

function showImageC(name, URLID, source) {
	if (window.isLive) {
		window.requestBLOB(name, 'img', source, URLID);
	} else {
		window.requestBLOB(source, URLID, function (BLOBURL) {
			$(`#${name}`).attr('src', BLOBURL);
		});
	}
	$(`#${name}`).on('load', function () {
		window.URL.revokeObjectURL($(`#${name}`).attr('src'));
		$(`#${name}`).css('-webkit-filter', 'blur(0px)');
		window.fadeOut('showImage_' + name + '_containerB');
		if (typeof fx !== typeof undefined && fx !== false) {
			if (fx == 'rain') {
				window.setDimension(name);
			}
		}
	});
}

function showImageD(name) {
	$(`#${name}`).css('-webkit-filter', 'blur(0px)');
	window.fadeOut('showImage_' + name + '_containerC');
	if (typeof fx !== typeof undefined && fx !== false) {
		if (fx == 'rain') {
			window.setDimension(name);
		}
	}
}