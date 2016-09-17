/**
 * Created by Administrator on 2016/9/10.
 */
$(function(){

    //对分页显示做处理
    var curPage=1;
    queryAllAdmin(15,curPage);
    $("#start").on("click",function(){
        queryAllAdmin(15,1);
    });
    $("#end").on("click",function(){

    });
    $("#pre").on("click",function(){
        curPage--;
        if(curPage<1){
            curPage=1;
        }
        queryAllAdmin(15,curPage);
    });
    $("#next").on("click",function(){
        curPage++;
        queryAllAdmin(15,curPage);
    });

    $("#one").on("click",function(){
        queryAllAdmin(15,1);
    });
    $("#two").on("click",function(){
        queryAllAdmin(15,2);
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
                        if(datajson[i].Id.match(/^admin/)){
                            var $tr=$("<tr></tr>");
                            var $td1=$("<td></td>");

                            var adminJson=JSON.parse(datajson[i].Data);
                            $td1.text(adminJson.id);
                            var $td2=$("<td></td>");
                            $td2.text(adminJson.username);
                            var $td3=$("<td></td>");
                            $td3.text(adminJson.password);
                            var $td4=$("<td></td>");
                            if(adminJson.isSuperAdmin==1){
                                $td4.text("yes");
                            }else{
                                $td4.text("no");
                            }
                            var $td5=$("<td></td>");
                            //在创建删除按钮的时候，就必须吧事件绑定起来，这样才可以点击哪个，删除哪个。
                            var $deletebtn=$('<a class="deletebtn" href="#">delete</a>');
                            $deletebtn.on("click",function(){
                                var id=$(this).parent().parent().children().first().text();
                                deleteAdminById(id);
                            });
                            $td5.append($deletebtn);
                            var $td6=$("<td></td>");
                            var $updatebtn=$('<a class="updatebtn" href="#">update</a>');
                            $updatebtn.on("click",function(){
                                var id=$(this).parent().parent().children().first().text();
                                updateAdminById(id);
                            });
                            $td6.append($updatebtn);
                            $tr.append($td1);
                            $tr.append($td2);
                            $tr.append($td3);
                            $tr.append($td4);
                            $tr.append($td5);
                            $tr.append($td6);
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
            url:"../../../../product/DeleteProductById_get?id=admin"+id,
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
        window.location.href="updateAdmin.html?id="+id;
    }



});