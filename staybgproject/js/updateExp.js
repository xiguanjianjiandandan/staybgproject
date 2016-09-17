/**
 * Created by Administrator on 2016/9/10.
 */
$(function(){

    //获取从管理员列表跳转过来传递的id参数
    var mUrl = document.URL;
    var  paramAll =mUrl.split('?')[1];
    var paramValue= mUrl.split("=")[1];
    var id="exp"+paramValue;//即为要更新管理员的管理员ID
    $.ajax({
        url:"../../../../product/GetProductById_get?id="+id,
        type:"get",
        success:function(data){
            console.log(data);
            if(data!="null"){
                var datajson=JSON.parse(data);
                var id=(JSON.parse(datajson.Data)).id;
                var titletext=(JSON.parse(datajson.Data)).titletext;
                var titleimg=(JSON.parse(datajson.Data)).titleimg;
                var isFree=(JSON.parse(datajson.Data)).isFree;
                var type=(JSON.parse(datajson.Data)).type;
                var imglist=(JSON.parse(datajson.Data)).imglist;

                $(".expdetailurl").val(imglist[0].imgUrl);
                $(".expdetaildes").val(imglist[0].imgDes);

                for(var i=1;i<imglist.length;i++){
                    var $oRow=$('<div class="row imgItem">'+
                        '<div class="item col-sm-4 col-md-offset-3" >'+
                        '<input id="expdetailurl" type="text" class="form-control" value='+imglist[i].imgUrl+'>'+
                        '</div>'+
                        '<div class="item col-sm-4" >'+
                        ' <input id="expdetaildes" type="text" class="form-control" value='+imglist[i].imgDes+'>'+
                        ' </div>'+
                        ' <div  class="info col-sm-1 deletebox" id="">'+
                        '<button class="deleteDetailbtn">-</button>'+
                        ' </div>'+
                        '  </div>');

                    $(".deleteDetailbtn").on("click",function(){
                        console.log($(this).parent());
                        $(this).parent().parent().remove();
                    });

                    $("#updateexpbtn").before($oRow);
                }

                $("#expid").val(id);
                $("#titletext").val(titletext);
                $("#titleimg").val(titleimg);
                if(isFree==1){
                    $("#optionsPrice2").removeAttr("checked");
                    $("#optionsPrice1").prop("checked",true);
                }else{
                    $("#optionsPrice1").removeAttr("checked");
                    $("#optionsPrice2").prop("checked",true);
                }
                if(type==1){
                    $("#optionsClass1").prop("checked",true);
                    $("#optionsClass2").removeAttr("checked");
                    $("#optionsClass3").removeAttr("checked");
                    $("#optionsClass4").removeAttr("checked");
                }
                if(type==2){
                    $("#optionsClass2").prop("checked",true);
                    $("#optionsClass1").removeAttr("checked");
                    $("#optionsClass3").removeAttr("checked");
                    $("#optionsClass4").removeAttr("checked");
                }
                if(type==3){
                    $("#optionsClass3").prop("checked",true);
                    $("#optionsClass2").removeAttr("checked");
                    $("#optionsClass1").removeAttr("checked");
                    $("#optionsClass4").removeAttr("checked");
                }
                if(type==4){
                    $("#optionsClass4").prop("checked",true);
                    $("#optionsClass2").removeAttr("checked");
                    $("#optionsClass3").removeAttr("checked");
                    $("#optionsClass1").removeAttr("checked");
                }


            }else{
                alert("update error");
            }

        }
    });

    $("#updateexpbtn").on("click",function(){
        var expid=$("#expid").val().trim();
        var titletext=$("#titletext").val().trim();
        var titleimg=$("#titleimg").val().trim();
        var isFree=1;//1表示免费，2表示抢购
        if($("#optionsPrice1").is(":checked")){
            isFree=1;
        }
        if($("#optionsPrice2").is(":checked")){
            isFree=2;
        }
        var type=1;
        if($("#optionsClass1").is(":checked")){
            type=1;
        }
        if($("#optionsClass2").is(":checked")){
            type=2;
        }
        if($("#optionsClass3").is(":checked")){
            type=3;
        }
        if($("#optionsClass4").is(":checked")){
            type=4;
        }

        var imgList=[];
        var imgNum=$(".imgItem").length;
        for(var i=0;i<imgNum;i++){
            var imgUrl= $(".imgItem .expdetailurl").val().trim();
            var imgDes= $(".imgItem .expdetaildes").val().trim();
            imgList.push({
                "imgUrl":imgUrl,
                "imgDes":imgDes
            });
        }

        var exper={
            "id":expid,
            "titletext":titletext,
            "titleimg":titleimg,
            "isFree":isFree,
            "type":type,
            "imglist":imgList
        };
        updateAdminById(exper);
    });

    function updateAdminById(exper){
        var strData=JSON.stringify(exper);
        $.ajax({
            url:"../../../../product/CreateUpdateProduct_post",
            async:true,
            data:{
                "id":"exp"+exper.id,
                "datajson":strData
            },
            dataType:"json",
            type:"post",
            success:function(data,status,xhr){
                if(data==1){
                    window.location.href="queryExp.html";
                }
            }

        });
    }
})
/**
 * Created by Administrator on 2016/9/16.
 */
