/**
 * Created by Administrator on 2016/9/12.
 */
/**
 * Created by Administrator on 2016/9/10.
 */
/**
 * Created by Administrator on 2016/9/10.
 */
$(document).ready(function(){
    var oRegBtn=$("#regbtn");
    //setBtnDisable();

    $("#username").on("focus",function(){
        $(this).val("");
    });
    $("#phonenumber").on("focus",function(){
        $(this).val("");
    });
    $("#password").on("focus",function(){
        $(this).val("");
    });
    $("#repassword").on("focus",function(){
        $(this).val("");
    });

    $("#username").on("blur",function(){
        //只能包含数字字母，且不能以数字开头,且长度为6到12位
        var username=$(this).val();
        if(checkFormatOfNamePass(username)){
            //格式正确
            queryUserById(username);

        }else{
            //格式错误
            $("#usernameInfo").text("error");
            $("#usernameInfo").css("color","red");
        }
        setBtnDisable();
    });
    $("#phonenumber").on("blur",function(){
        //只能包含数字字母，且不能以数字开头,且长度为6到12位
        var phonenumber=$(this).val();
        if(checkFormatOfPhonenumber(phonenumber)){
            //格式正确
            $("#phonenumberInfo").text("ok")
            $("#phonenumberInfo").css("color","green");

        }else{
            //格式错误
            $("#phonenumberInfo").text("error");
            $("#phonenumberInfo").css("color","red");
        }
        setBtnDisable();
    });
    $("#password").on("blur",function(){
        var password=$(this).val();
        if(checkFormatOfNamePass(password)){
            //格式正确
            $("#passwordInfo").text("ok")
            $("#passwordInfo").css("color","green");


        }else{
            //格式错误
            $("#passwordInfo").text("error");
            $("#passwordInfo").css("color","red");
        }
        setBtnDisable();
    });
    $("#repassword").on("blur",function(){
        var repassword=$(this).val();
        var password=$("#password").val();
        if(repassword!=password){
            $("#repasswordInfo").text("error");
            $("#repasswordInfo").css("color","red");

        }else{
            $("#repasswordInfo").text("ok");
            $("#repasswordInfo").css("color","green");
        }
        setBtnDisable();
    });

    $("#regbtn").on("click",function(){
        register();
    });


    //用于用于输入格式是否正确
    function checkFormatOfNamePass(text){
        var format=/^([a-z]|[A-Z]|_){1}([a-z]|[A-Z]|[0-9]|_){5,11}/;
        return format.test(text);
    }
    function checkFormatOfPhonenumber(phonenumber){
        var format2=/^1[3|4|5|7|8]\d{9}$/;
        return format2.test(phonenumber);
    }

    //设置注册按钮的状态
    function setBtnDisable(){
        var usernameInfo=$("#usernameInfo").text().trim();
        var passwordInfo=$("#passwordInfo").text().trim();
        var repasswordInfo=$("#repasswordInfo").text().trim();
        if(usernameInfo=="ok"&&passwordInfo=="ok"&&repasswordInfo=="ok"){

            oRegBtn.removeAttr("disabled");
        }else{
            oRegBtn.attr("disabled",true);
        }
    }

    //查询当前用户是否存在？
    function queryUserById(id){
        $.ajax({
            url:"../../../../product/GetProductById_get?id=user"+id,
            type:"get",
            success:function(data){
                if(data!="null"){
                    console.log(data);
                    $("#usernameInfo").text("exited");
                    $("#usernameInfo").css("color","red");
                }else{
                    $("#usernameInfo").text("ok")
                    $("#usernameInfo").css("color","green");
                }

            }
        });
    }
    //注册用户
    function register(){
        //如何使用jquery获取单选按钮的默认选中状态？
        //console.log($("#optionsRadios1").is(":checked"));
        //console.log($("#optionsRadios2").is(":checked"));
        var username=$("#username").val().trim();
        var phonenumber=$("#phonenumber").val().trim();
        var password=$("#password").val().trim();
        var repassword=$("#repassword").val().trim();

        var user={
            "id":username,
            "username":username,
            "phonenumber":phonenumber,
            "password":password
        };
        var strData=JSON.stringify(user);
        console.log(strData);
        $.ajax({
            url:"../../../../product/CreateUpdateProduct_post",
            async:true,
            data:{
                "id":"user"+username,
                "datajson":strData
            },
            dataType:"json",
            type:"post",
            success:function(data,status,xhr){
                if(data==1){
                    window.location.href="../../html/user/queryUser.html";
                }
            }

        });
        //$.post("http://localhost:63486/product/CreateUpdateProduct_post",data,function(data,status){
        //    console.log(status+","+data);
        //});
    }

});

