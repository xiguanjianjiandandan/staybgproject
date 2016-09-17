/**
 * Created by Administrator on 2016/9/10.
 */
$(document).ready(function(){

    $("#username").on("focus",function(){
        $(this).val("");
    });
    $("#password").on("focus",function(){
        $(this).val("");
    });

    $("#loginbtn").on("click",function(){
        var username=$("#username").val().trim();
        var password=$("#password").val().trim();
        if($("#rememberbtn").is(":checked")){
            saveLoginInfoToCookie(username,password);
        }

        checkUsername(username,password);

    });



    //检测输入的用户名和密码
    function checkUsername(username,password){
        $.ajax({
            url:"../../product/GetProductById_get?id="+"admin"+username,
            type:"get",
            success:function(data){
                //如果用户不存在，则直接提示用户名或者密码错误
                if(data!="null"){
                    var datajson=JSON.parse(data);
                    var pass=(JSON.parse(datajson.Data)).password;//注意Data对应的值为字符串，也需要转换成JSON对象
                    //如果用户存在，但是用户与密码不匹配，则也提示：用户名或者密码错误
                    if(pass==password){
                        window.location.href="index.html?username="+username;
                    }else{
                        $("#loginfo").css("visibility","visible");
                    }
                }else{
                    $("#loginfo").css("visibility","visible");
                }

            }
        })

    }

    //登录时点击“记住密码”，则将登录信息保存到cookie中
    function saveLoginInfoToCookie(username,password){
        var user={
            "username":username,
            "password":password
        }
        var date=new Date();
        date.setDate(date.getDate()+1);
        var strUser=JSON.stringify(user);
        document.cookie="adminInfo="+strUser+";repires="+date;

    }


});