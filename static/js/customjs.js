
$(document).ajaxStart(function(){
  $("#loading_div").css("display","block");
  $('body').css("opacity","0.5")
});

$(document).ajaxComplete(function(){
  $("#loading_div").css("display","none");
  $('body').css("opacity","1")
}); 

    var ok;
    function ajaxformsubmit(aform, url, method, key, redirect_url){
        $.ajax({
                url: url,
                type: method,
                data : $(aform).serialize(),
                dataType: "json",
                success : function(d){
                        alert(d.msg);
                        if (d.success == true){
                            return replacefunc(key, redirect_url);
                        }
                },
                failure : function(data){
                        alert('Error Occured')
                }
        });
        return false;
    };
    
    function replacefunc(key, redirect_url){
            $.ajax({
                type: "GET",
                url:redirect_url,
                data:{"key":key},
                success:function(data){
                    $('#replace-part').html(data);
                }
            });
     return false;
    }



    function central_redirect_func(menu, permission_key){
        $.ajax({
            type: "GET",
            url : '/check_permission/'+menu+'/',
            data : {'prk': permission_key},
            dataType: "json",
            async : false,
            success: function(data){
                        if (data.status == "Error"){
                            alert(data.message);
                            ok = false
                        } else {
                        ok = true;
                        }
            }
        })
        return ok
    
    }

