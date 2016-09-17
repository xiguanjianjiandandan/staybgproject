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
    $("#password").on("focus",function(){
        $(this).val("");
    });
    $("#repassword").on("focus",function(){
        $(this).val("");
    });

    $("#username").on("blur",function(){
        //ֻ�ܰ���������ĸ���Ҳ��������ֿ�ͷ,�ҳ���Ϊ6��12λ
        var username=$(this).val();
        if(checkFormat(username)){
            //��ʽ��ȷ
            queryAdminById(username);

        }else{
            //��ʽ����
            $("#usernameInfo").text("error");
            $("#usernameInfo").css("color","red");
        }
        setBtnDisable();
    });
    $("#password").on("blur",function(){
        var password=$(this).val();
        if(checkFormat(password)){
            //��ʽ��ȷ
            $("#passwordInfo").text("ok")
            $("#passwordInfo").css("color","green");


        }else{
            //��ʽ����
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


    //�������������ʽ�Ƿ���ȷ
    function checkFormat(text){
        var format=/^([a-z]|[A-Z]|_){1}([a-z]|[A-Z]|[0-9]|_){5,11}/;
        return format.test(text);
    }

    //����ע�ᰴť��״̬
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
    //��ѯ��ǰ�û��Ƿ���ڣ�
    function queryAdminById(id){
        $.ajax({
            url:"../../../../product/GetProductById_get?id=admin"+id,
            type:"get",
            success:function(data){
                if(data!="null"){
                    $("#usernameInfo").text("exited");
                    $("#usernameInfo").css("color","red");
                }else{
                    $("#usernameInfo").text("ok")
                    $("#usernameInfo").css("color","green");
                }

            }
        });
    }
    //ע���û�
    function register(){
        //���ʹ��jquery��ȡ��ѡ��ť��Ĭ��ѡ��״̬��
        //console.log($("#optionsRadios1").is(":checked"));
        //console.log($("#optionsRadios2").is(":checked"));
        var username=$("#username").val().trim();
        var password=$("#password").val().trim();
        var repassword=$("#repassword").val().trim();
        var isSuperAdmin=0;//1��ʾ�ǳ�������Ա��0��ʾ���ǳ�������Ա

        if($("#optionsRadios1").is(":checked")){
            isSuperAdmin=1;
        }
        if($("#optionsRadios2").is(":checked")){
            isSuperAdmin=0;
        }

        var adminer={
            "id":username,
            "username":username,
            "password":password,
            "isSuperAdmin":isSuperAdmin
        };
        var strData=JSON.stringify(adminer);
        console.log(strData);
        $.ajax({
            url:"../../../../product/CreateUpdateProduct_post",
            async:true,
            data:{
                "id":"admin"+username,
                "datajson":strData
            },
            dataType:"json",
            type:"post",
            success:function(data,status,xhr){
                if(data==1){
                    window.location.href="../../html/admin/queryAdmin.html";
                }
            }

        });
        //$.post("http://localhost:63486/product/CreateUpdateProduct_post",data,function(data,status){
        //    console.log(status+","+data);
        //});
    }

});
