/**
 * Created by Administrator on 2016/9/12.
 */
/*������ҳǰ��Ҫ���ȼ��cookie���Ƿ��е�ǰ�û���¼��Ϣ���еĻ���ֱ�ӽ�����ҳ�棬û�еĻ�����ת����¼����*/

//�ӵ�½ҳ����ת�ĵ�ǰҳ�棬ͬʱ����url�д��ݹ����Ĳ���username.
var mUrl = document.URL;
var  paramAll =mUrl.split('?')[1];
var paramValue= mUrl.split("=")[1];
console.log(paramValue);
//��cookie�л�ȡ��¼��Ϣ
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


//��¼�ɹ���Ĳ���
$(function(){
    if(paramValue!=undefined){
        $("#currentUser").text(paramValue);
        isSuperAdmin(paramValue);
    }else{
        $("#currentUser").text(curUser);
        isSuperAdmin(curUser);
    }

    $("#exitbtn").on("click",function(){
        //���cookie�е����ݣ�������ת����¼����
        document.cookie="adminInfo="+""+";repires="+new Date();
        window.location.href="login.html";
    });

    function isSuperAdmin(username){
        $.ajax({
            url:"../../product/GetProductById_get?id="+"admin"+username,
            type:"get",
            success:function(data){
                //����û������ڣ���ֱ����ʾ�û��������������
                if(data!="null"){
                    var datajson=JSON.parse(data);
                    var isSuperAdmin=(JSON.parse(datajson.Data)).isSuperAdmin;//ע��Data��Ӧ��ֵΪ�ַ�����Ҳ��Ҫת����JSON����
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

