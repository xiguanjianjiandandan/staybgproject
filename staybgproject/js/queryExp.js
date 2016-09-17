/**
 * Created by Administrator on 2016/9/16.
 */
/**
 * Created by Administrator on 2016/9/10.
 */
$(function(){

    //对分页显示做处理
    var curPage=4;
    queryAllAdmin(15,curPage);
    $("#start").on("click",function(){
        queryAllAdmin(15,10);
    });
    $("#end").on("click",function(){

    });
    $("#pre").on("click",function(){
        curPage--;
        if(curPage<10){
            curPage=10;
        }
        queryAllAdmin(15,curPage);
    });
    $("#next").on("click",function(){
        curPage++;
        queryAllAdmin(15,curPage);
    });

    $("#one").on("click",function(){
        queryAllAdmin(15,4);
    });
    $("#two").on("click",function(){
        queryAllAdmin(15,5);
    });
    $("#three").on("click",function(){
        queryAllAdmin(15,3);
    });
    $("#four").on("click",function(){
        queryAllAdmin(15,4);
    });
    $("#five").on("click",function(){
        queryAllAdmin(15,5);
    });



    //分页查询所有商品
    function queryAllAdmin(pagesize,pageindex){
        $("tbody").html("");
        $.ajax({
            url:"../../../../product/GetProductsByPage_get?pagesize="+pagesize+"&pageindex="+pageindex,
            type:"get",
            success:function(data){
                console.log(data);
                if(data!="null"){
                    var datajson=JSON.parse(data);
                    for(var i=0;i<datajson.length;i++){
                        if(datajson[i].Id.match(/^exp/)){
                            var $tr=$("<tr></tr>");
                            var $td1=$("<td></td>");

                            var expJson=JSON.parse(datajson[i].Data);
                            $td1.text(expJson.id);
                            var $td2=$("<td></td>");
                            $td2.text(expJson.titletext);
                            var $td3=$("<td></td>");
                            $td3.text(expJson.titleimg);
                            var $td4=$("<td></td>");
                            if(expJson.isFree==1){
                                $td4.text("免费");
                            }else{
                                $td4.text("限时抢购");
                            }
                            var $td5=$("<td></td>");
                            if(expJson.type==1){
                                $td5.text("精选");
                            }
                            if(expJson.type==2){
                                $td5.text("慢旅");
                            }
                            if(expJson.type==3){
                                $td5.text("偷闲");
                            }
                            if(expJson.type==4){
                                $td5.text("话题");
                            }
                            var $td6=$("<td></td>");
                            $td6.text(expJson.imglist);

                            var $td7=$("<td></td>");
                            //在创建删除按钮的时候，就必须吧事件绑定起来，这样才可以点击哪个，删除哪个。
                            var $deletebtn=$('<a class="deletebtn" href="#">delete</a>');
                            $deletebtn.on("click",function(){
                                var id=$(this).parent().parent().children().first().text();
                                deleteAdminById(id);
                            });

                            var $td8=$("<td></td>");
                            var $updatebtn=$('<a class="updatebtn" href="#">update</a>');
                            $updatebtn.on("click",function(){
                                var id=$(this).parent().parent().children().first().text();
                                updateAdminById(id);
                            });
                            $td7.append($deletebtn);
                            $td8.append($updatebtn);
                            $tr.append($td1);
                            $tr.append($td2);
                            $tr.append($td3);
                            $tr.append($td4);
                            $tr.append($td5);
                            $tr.append($td6);
                            $tr.append($td7);
                            $tr.append($td8);
                            $("tbody").append($tr);

                        }
                    }
                }

            }
        });
    }


    //删除指定商品
    function deleteAdminById(id){
        $.ajax({
            url:"../../../../product/DeleteProductById_get?id=exp"+id,
            type:"get",
            success:function(data){
                if(data==1){
                    window.location.reload();//刷新当前页面
                }
            }
        });
    }
    //更新指定商品
    function updateAdminById(id){
        window.location.href="updateExp.html?id="+id;
    }



});