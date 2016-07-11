var wof = {
    
        start: function () {
            wof.getData();
            wof.addButtons();
            
  
        },
    alphabet: "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ",
    word: null,
    hints: 6,
   
    getData: function () {
    $.ajax({    
                type : "GET",
                url: "words1.json",
                
                dataType: 'json'
            }).done(function (json) {
                $('#loader').fadeOut(1000);
                wof.words = json;
                wof.sentence();
                console.log(wof.word);
                wof.addWord();
                wof.game();
                wof.checkAnswer();
                
            });
    },
    sentence: function() {
        wof.word =wof.words[Math.floor(Math.random()*wof.words.length)];
    },
    addButtons: function () {
        var button = $("<button/>",{
            id:'checkBtn',
            text: "check out"});
        $('#counter').append(button);
         for (var i = 0; i < wof.alphabet.length; i++) {
             var buttons = $("<button/>", {
                 id: wof.alphabet[i],
                 text: wof.alphabet[i]
             });
             $('#letterCont').append(buttons);
         };
            $('#count').html('pozostało '+ wof.hints+ '<i class="fa fa-heart-o fa-4x"></i>');
        
                
    },
    addWord: function(){
        for (var i =0;i<wof.word.length;i++) {
            if (wof.word[i] === " ") {
                 var input = $("<br>");
            
    } else {
                var input = $("<input/>",{
                     class: "phraseLetter",
                     type: "text",
                     id: [i],
//                     val: wof.word.charAt(i),
                     maxlength: 1,
                     style: "text-transform:uppercase"});
            }
                $('#phraseCont').append(input);

            }
            
        },
    game: function (){
        $("input[type=text]").on('input',function () {
    if($(this).val().length === 1) {
        jQuery(this).next("input").focus();
    }
});
        
    $('#letterCont button').on('click',function(){
        $(this).prop('disabled',true);
        wof.hints--;
        $('#count').html('pozostało '+ wof.hints+ '<i class="fa fa-heart-o fa-4x"></i>');
        if (wof.hints===0){
            $('#letterCont').children().prop('disabled',true);
        }
        for (var i =0;i<wof.word.length;i++) {
            var button = $(this).attr('id');
        if (button=== wof.word.charAt(i)) {
            $('input#'+i).val(wof.word.charAt(i));
        }
        }
    
});
                  
                    },
    checkAnswer: function(){
        
        $('#checkBtn').on('click', function (){
            $(this).prop('disabled',true);
        
       var inputs = [];
            var trim = wof.word.replace(/\s/g, '');
        $('input').each(function(){
     inputs.push($(this).val());
            
        
});
           inputs = inputs.join('');
            inputs = inputs.toUpperCase();
            if(inputs === trim) {
                $('#success.modal').show();
                $('.yes').click(function() {
                location.reload();
                    });
                $('.no').click(function(){
                    location.href='http://www.pudelek.pl';
                });

        
                
            } else {
                $('#fail.modal').show();
                 $('.yes').click(function() {
                location.reload();
                    });
                $('.no').click(function(){
                    location.href='http://www.pudelek.pl';
                });
                
                
            }
            console.log(inputs);
            console.log(trim);
        });
         
    }
    
};

$(document).ready(function(){
    
    wof.start();
});