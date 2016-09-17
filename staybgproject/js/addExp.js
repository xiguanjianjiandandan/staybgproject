/**
 * Created by Administrator on 2016/9/16.
 */
$(function(){

    $("#expid").on("focus",function(){
        $(this).val("");
    });
    $("#titletext").on("focus",function(){
        $(this).val("");
    });
    $("#titleimg").on("focus",function(){
        $(this).val("");
    });
    $(".expdetailurl").on("focus",function(){
        $(this).val("");
    });
    $(".expdetaildes").on("focus",function(){
        $(this).val("");
    });


    //添加详情内容
    $("#addDetailbtn").on("click",function(){
        var $oRow=$('<div class="row imgItem">'+
        '<div class="item col-sm-4 col-md-offset-3" >'+
            '<input id="expdetailurl" type="text" class="form-control" value="">'+
        '</div>'+
        '<div class="item col-sm-4" >'+
        ' <input id="expdetaildes" type="text" class="form-control" value="">'+
        ' </div>'+
        ' <div  class="info col-sm-1 deletebox" id="">'+
            '<button class="deleteDetailbtn">-</button>'+
        ' </div>'+
        '  </div>');

        $(".deleteDetailbtn").on("click",function(){
            console.log($(this).parent());
            $(this).parent().parent().remove();
        });

        $("#addexpbtn").before($oRow);

    });


    //添加体验
    $("#addexpbtn").on("click",function(){
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

        addExp(exper);

    });


    function addExp(exper){
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













});