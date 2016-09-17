/**
 * Created by Administrator on 2016/9/12.
 */
/*进入主页前，要首先检查cookie中是否有当前用户登录信息，有的话，直接进入主页面，没有的话，跳转到登录界面*/

//从登陆页面跳转的当前页面，同时接受url中传递过来的参数username.
var mUrl = document.URL;
var  paramAll =mUrl.split('?')[1];
var paramValue= mUrl.split("=")[1];
console.log(paramValue);
//从cookie中获取登录信息
var strCookie=document.cookie;
var arrCookie=strCookie.split("; ");
var usernameCookie;
var passwordCookie;
var curUser;
for(var i=0;i<arrCookie.length;i++){
    var result1=arrCookie[i].split("=");
    if(result1[0]=="adminInfo"){
        result2=result1[1];
        if(result2!=""){
            var arrResult=result2.split(",");
            usernameCookie=arrResult[0];
            passwordCookie=arrResult[1];
            curUser=JSON.parse(arrResult).username;
        }

    }
}

if(usernameCookie==null&&passwordCookie==null){
    window.location.href="login.html";
}


//登录成功后的操作
$(function(){
    if(paramValue!=undefined){
        $("#currentUser").text(paramValue);
        isSuperAdmin(paramValue);
    }else{
        $("#currentUser").text(curUser);
        isSuperAdmin(curUser);
    }

    $("#exitbtn").on("click",function(){
        //清除cookie中的内容，并且跳转到登录界面
        document.cookie="adminInfo="+""+";repires="+new Date();
        window.location.href="login.html";
    });

    function isSuperAdmin(username){
        $.ajax({
            url:"../../product/GetProductById_get?id="+"admin"+username,
            type:"get",
            success:function(data){
                //如果用户不存在，则直接提示用户名或者密码错误
                if(data!="null"){
                    var datajson=JSON.parse(data);
                    var isSuperAdmin=(JSON.parse(datajson.Data)).isSuperAdmin;//注意Data对应的值为字符串，也需要转换成JSON对象
                    console.log(isSuperAdmin);
                    if(isSuperAdmin==1){

                    }else if(isSuperAdmin==0){
                        $("#adminMenuTitle").css("display","none");
                        $("#adminMenu").css("display","none");
                    }

                }

            }
        })
    }
});

