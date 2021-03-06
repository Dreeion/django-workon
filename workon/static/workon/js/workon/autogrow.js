jQuery.fn.autoGrow = function(options)
{
    return this.each(function() {

        if(this.hasAutoGrow) return;
        this.hasAutoGrow = true;

        var settings = jQuery.extend({
            extraLine: true,
        }, options);

        var createMirror = function(textarea) {
            jQuery(textarea).after('<div class="autogrow-textarea-mirror"></div>');
            return jQuery(textarea).next('.autogrow-textarea-mirror')[0];
        }

        var sendContentToMirror = function (textarea) {
            mirror.innerHTML = String(textarea.value)
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\n/g, '<br />') +
                (settings.extraLine? '.<br/>.' : '')
            ;

            if (jQuery(textarea).height() != jQuery(mirror).height())
                jQuery(textarea).height(jQuery(mirror).height());
        }

        var growTextarea = function () {
            sendContentToMirror(this);
        }

        // Create a mirror
        var mirror = createMirror(this);

        // Style the mirror
        mirror.style.display = 'none';
        mirror.style.wordWrap = 'break-word';
        mirror.style.whiteSpace = 'pre-wrap';
        mirror.style.padding = jQuery(this).css('paddingTop') + ' ' +
            jQuery(this).css('paddingRight') + ' ' +
            jQuery(this).css('paddingBottom') + ' ' +
            jQuery(this).css('paddingLeft');

        mirror.style.borderStyle = jQuery(this).css('borderTopStyle') + ' ' +
            jQuery(this).css('borderRightStyle') + ' ' +
            jQuery(this).css('borderBottomStyle') + ' ' +
            jQuery(this).css('borderLeftStyle');

        mirror.style.borderWidth = jQuery(this).css('borderTopWidth') + ' ' +
            jQuery(this).css('borderRightWidth') + ' ' +
            jQuery(this).css('borderBottomWidth') + ' ' +
            jQuery(this).css('borderLeftWidth');

        mirror.style.width = jQuery(this).css('width');
        mirror.style.fontFamily = jQuery(this).css('font-family');
        mirror.style.fontSize = jQuery(this).css('font-size');
        mirror.style.lineHeight = jQuery(this).css('line-height');
        mirror.style.letterSpacing = jQuery(this).css('letter-spacing');

        // Style the textarea
        this.style.overflow = "hidden";
        // this.style.minHeight = this.rows+"em";

        // Bind the textarea's event
        this.onkeyup = growTextarea;
        this.onfocus = growTextarea;

        // Fire the event for text already present
        sendContentToMirror(this);

    });
};

$(document).on('focus', 'textarea', function () {
    $(this).autoGrow();
});
$(document).ready(function() {
    $('textarea').autoGrow();
});
$(document).on('xhr.response', function(e) {
    $('textarea').autoGrow();
});
$(document).on('modal.ready', function(e) {
    $('textarea').autoGrow();
});
$(document).on('tabs.changed', function(e) {
    $('textarea').autoGrow();
});