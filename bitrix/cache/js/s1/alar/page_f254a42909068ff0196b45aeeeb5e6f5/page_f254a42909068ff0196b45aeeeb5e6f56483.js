
; /* Start:"a:4:{s:4:"full";s:81:"/local/components/cmind/form.question/templates/.default/script.js?14485404062302";s:6:"source";s:66:"/local/components/cmind/form.question/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(document).ready(function(){
    $('.question-form').on('submit', function(e){
        $('.question-form input[name="fio"]').removeClass("formError");
        $('.question-form input[name="email"]').removeClass("formError");
        $('.question-form textares[name="question"]').removeClass("formError");

        e.preventDefault();
        var $that = $(this),
        formData = new FormData($that.get(0)); // создаем новый экземпляр объекта и передаем ему нашу форму (*)

        $.ajax({
            url: $that.attr('action'),
            type: $that.attr('method'),
            cmd: 'question',
            contentType: false, // важно - убираем форматирование данных по умолчанию
            processData: false, // важно - убираем преобразование строк по умолчанию
            data: formData,
            dataType: 'json',
            success: function(json){
                if(json){
                    if (json['result'] == "error") {                        if (json['error']['fio']) { $('.question-form input[name="fio"]').addClass("formError"); }
                        if (json['error']['email']) { $('.question-form input[name="email"]').addClass("formError"); }
                        if (json['error']['question']) { $('.question-form textarea[name="question"]').addClass("formError"); }
                        alert('Заполните, пожалуйста, все обязательные поля.');
                    } else {                        $('.question-form input[name="fio"]').removeClass("formError");
                        $('.question-form input[name="email"]').removeClass("formError");
                        $('.question-form textares[name="question"]').removeClass("formError");

                        $('.question-form input[name="fio"]').val('');
                        $('.question-form input[name="email"]').val('');
                        $('.question-form textarea[name="question"]').val('');
                        alert('Спасибо, Ваше сообщение отправлено!');
                    }
                }
            }
        });
    });
});
/* End */
;
; /* Start:"a:4:{s:4:"full";s:74:"/local/components/cmind/clients/templates/.default/script.js?1448540406477";s:6:"source";s:60:"/local/components/cmind/clients/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(document).ready(function() {
    $('#slider-partners .slider').carouFredSel({
        width: 900,
        height: 100,
        items: {
            visible: 5,
            minimum: 1,
            width: 180,
            height: 80
        },
        direction: 'left',
        scroll: {
            items: 1,
            duration: 500
        },
        auto: 4000,
        prev: '#slider-partners .prev',
        next: '#slider-partners .next'
    });
});
/* End */
;; /* /local/components/cmind/form.question/templates/.default/script.js?14485404062302*/
; /* /local/components/cmind/clients/templates/.default/script.js?1448540406477*/
