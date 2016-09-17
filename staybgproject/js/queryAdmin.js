/**
 * Created by Administrator on 2016/9/10.
 */
$(function(){

    //�Է�ҳ��ʾ������
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



    //��ҳ��ѯ������Ʒ
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
                            //�ڴ���ɾ����ť��ʱ�򣬾ͱ�����¼��������������ſ��Ե���ĸ���ɾ���ĸ���
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


    //ɾ��ָ����Ʒ
    function deleteAdminById(id){
        $.ajax({
            url:"../../../../product/DeleteProductById_get?id=admin"+id,
            type:"get",
            success:function(data){
                if(data==1){
                    window.location.reload();//ˢ�µ�ǰҳ��
                }
            }
        });
    }
    //����ָ����Ʒ
    function updateAdminById(id){
        window.location.href="updateAdmin.html?id="+id;
    }



});