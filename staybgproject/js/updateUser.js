/**
 * Created by Administrator on 2016/9/10.
 */
$(function(){

    //��ȡ�ӹ���Ա�б���ת�������ݵ�id����
    var mUrl = document.URL;
    var  paramAll =mUrl.split('?')[1];
    var paramValue= mUrl.split("=")[1];
    var id="user"+paramValue;//��ΪҪ���¹���Ա�Ĺ���ԱID
    $.ajax({
        url:"../../../../product/GetProductById_get?id="+id,
        type:"get",
        success:function(data){
            console.log(data);
            if(data!="null"){
                var datajson=JSON.parse(data);
                var username=(JSON.parse(datajson.Data)).username;
                var phonenumber=(JSON.parse(datajson.Data)).phonenumber;
                var password=(JSON.parse(datajson.Data)).password;

                $("#username").val(username);
                $("#username").prop("disabled",true);
                $("#password").val(password);
                $("#phonenumber").val(phonenumber);

            }else{
                alert("����ʧ��");
            }

        }
    });

    $("#updatebtn").on("click",function(){
        updateAdminById();
    });

    function updateAdminById(){
        var username=$("#username").val().trim();
        var password=$("#password").val().trim();
        var phonenumber=$("#phonenumber").val().trim();
        var isSuperAdmin=0;
        if($("#optionsRadios1").is(":checked")){
            isSuperAdmin=1;
        }
        if($("#optionsRadios2").is(":checked")){
            isSuperAdmin=0;
        }
        var user={
            "id":username,
            "username":username,
            "phonenumber":phonenumber,
            "password":password

        };
        var strData=JSON.stringify(user);
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
                    window.location.href="queryUser.html";
                }
            }

        });
    }
})
