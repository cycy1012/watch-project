require(['config'],function(){
	require(['jquery','global'],function(){
		$(function(){
			$('.liOne').click(function(){
				$('.message_list').slideToggle(500);
			})

			$('.addPro').click(function(){
				window.location.href='addProduct.html'
				console.log(111)
			})

			$.ajax({
				type: 'post',
				dataType: 'json',
				url: erp.baseUrl + 'getProduct',
				success:function(data){
					var header = `<table>
									<tbody>
										`
                 	header += data.map(function(elem,index){
                   		return `
                   		<tr class="trOne">
							<td><img src="../upload/${elem.preview}"></td>
							<td>${elem.name}</td>
							<td>${elem.price}</td>
							<td>${elem.old_price}</td>
							<td>${elem.fare}</td>
							<td>${elem.sale_number}</td>
							<td>${elem.people}</td>
							<td><button class="changeBtn" data-id="${elem._id}">o</button>
								<button class="delBtn" data-id="${elem._id}">x</button>
							</td>
						
						</tr>`
                   }).join('');
                 	header+=`</tbody></table>`
					$('.product_main').append(header)
                }
			});

			//删除数据
			$('.product_main').on('click','.delBtn',function(){
				var id = $(this).attr('data-id')
				var tr = $(this).parents()[1];
				if(confirm('确定要删除数据?')){

					$.ajax({
						type:'post',
						data:{'_id':id},
						dataType:'json',
						url:erp.baseUrl + 'delProductByid',
						success:function(response){

						}
					})
					$(tr).fadeOut();
				}
				
			})

			//打开指定ID数据的数据窗口
			$('.product_main').on('click','.changeBtn',function(){
				var id = $(this).attr('data-id');
				$.ajax({
					type:'post',
					data:{'_id':id},
					dataType:'json',
					url:erp.baseUrl + 'gainProductById',
					success:function(response){
						console.log(response)
						response.forEach(function(elem,index){						
							$('.tab_main').html(change(elem))
						})

					}
				})
				$('.change_main').fadeIn()
			})

			//关闭修改窗口
			$('.change_main').on('click','.close',function(){
				$('.change_main').fadeOut()
			})

			//修改商品数据
			$('.tab_main').on('click','.changeBtns',function(){
				var id = $('.changeBtns').attr('data-id')
				console.log(id)
				var newObj = {};

				newObj.name = $('#name').val();
				newObj.price = $('#price').val();
				newObj.old_price = $('#old_price').val();
				newObj.pinpai = $('#pinpai').val();
				newObj.fare = $('#fare').val();
				newObj.sale_number = $('#sale_number').val();
				newObj.people = $('#people').val();
				newObj.xinghao = $('#xinghao').val();
				newObj.jixin = $('#jixin').val();
				newObj.biaokou = $('#biaokou').val();
				newObj.biaojing = $('#biaojing').val();
				newObj.biaodi = $('#biaodi').val();
				newObj.big = $('#big').val();
				newObj.xingzhuang = $('#xingzhuang').val();
				newObj.kedu = $('#kedu').val();
				newObj.color = $('#color').val();
				newObj.caizhi = $('#caizhi').val();
				newObj.fangshui = $('#fangshui').val();
				newObj.zhengshu = $('#zhengshu').val();
				newObj.qujian = $('#qujian').val();
				newObj.changjing = $('#changjing').val();
				newObj.gongneng = $('#gongneng').val();
				newObj.new = $('#new').val();

				$.ajax({
					type:'post',
					data: {'_id':id,"newData":JSON.stringify(newObj)},
					dataType: 'json',
					url: erp.baseUrl + 'changeProductByid',
					success:function(data){
						console.log(data)
					}
				})
				alert('商品数据修改成功')
				window.location.reload();
			})

			//搜索按钮

			$('.search_btn').click(function(event){
				
				var text = $('.searchText').val()

				if (text == '') {
					alert('请输入正确的商品信息')
					return false;
				}
				
				$('.search_main').fadeIn();
				$('.product_main').fadeOut()

				$.ajax({
					type:'post',
					data: {'classify':text},
					dataType: 'json',
					url: erp.baseUrl + 'searchProduct',
					success:function(response){
						console.log(response)
						var datas = `<table>
									<tbody>
										`
	                 	datas += response.map(function(elem,index){
	                   		return `
	                   		<tr class="trtwo">
								<td><img src="../upload/${elem.preview}"></td>
								<td>${elem.name}</td>
								<td>${elem.price}</td>
								<td>${elem.old_price}</td>
								<td>${elem.fare}</td>
								<td>${elem.sale_number}</td>
								<td>${elem.people}</td>
								<td><button class="changeBtn" data-id="${elem._id}">o</button>
									<button class="delBtn" data-id="${elem._id}">x</button>
								</td>
							
							</tr>`
	                   }).join('');
	                 	datas+=`</tbody></table>`;
	                 	$('.search_main').html(datas);
					}
				})
				//删除搜索到的数据
				$('.search_main').on('click','.delBtn',function(){
					var id = $(this).attr('data-id')
				
					var aa = $(this).parents()[1];
					if(confirm('确定要删除数据')){
						$.ajax({
							type:'post',
							data:{'_id':id},
							dataType:'json',
							url:erp.baseUrl + 'delProductByid',
							success:function(response){

							}
						})
						$(aa).fadeOut();
					}
				})

				$('.search_main').on('click','.changeBtn',function(){
					var id = $(this).attr('data-id')
					console.log(id)
					$.ajax({
						type:'post',
						data:{'_id':id},
						dataType:'json',
						url:erp.baseUrl + 'gainProductById',
						success:function(response){
							console.log(response)
							response.forEach(function(elem,index){						
								$('.tab_main').html(change(elem))
							})

						}
					})
					$('.change_main').fadeIn()
				})
			})
			//封装获取的数据，方便调用
			function change(elem){
				return `
					<div class="two">
						<span>商品图片:</span>
						<input type="text" id="picture" value="${elem.preview.substring(8)}">
					</div>
					<div class="one">
						<span>商品名称:</span>
						<input type="text" id="name" value="${elem.name}">
						<span>商品现价:</span>
						<input type="text" id="price" value="${elem.price}">
						<span>商品原价:</span>
						<input type="text" id="old_price" value="${elem.old_price}">
						<span>商品品牌:</span>
						<input type="text" id="pinpai" value="${elem.pinpai}">
					</div>
					<div class="one">
						<span>商品运费:</span>
						<input type="text" id="fare" value="${elem.fare}">
						<span>售出数量:</span>
						<input type="text" id="sale_number" value="${elem.sale_number}">
						<span>使用人群:</span>
						<input type="text" id="people" value="${elem.people}">
						<span>商品型号:</span>
						<input type="text" id="xinghao" value="${elem.xinghao}">
					</div>
					<div class="one">
						<span>名称机芯:</span>
						<input type="text" id="jixin" value="${elem.jixin}">
						<span>商品表扣:</span>
						<input type="text" id="biaokou" value="${elem.biaokou}">
						<span>商品表壳:</span>
						<input type="text" id="biaoke" value="">
						<span>商品表镜:</span>
						<input type="text" id="biaojing" value="${elem.biaojing}">
					</div>
					<div class="one">
						<span>商品表底:</span>
						<input type="text" id="biaodi" value="${elem.biaodi}">
						<span>表盘大小:</span>
						<input type="text" id="big" value="${elem.big}">
						<span>表盘形状:</span>
						<input type="text" id="xingzhuang" value="${elem.xingzhuang}">
						<span>表盘刻度:</span>
						<input type="text" id="kedu" value="${elem.kedu}">
					</div>
					<div class="one">
						<span>表带颜色:</span>
						<input type="text" id="color" value="${elem.color}">
						<span>表带材质:</span>
						<input type="text" id="caizhi" value="${elem.caizhi}">
						<span>商品防水:</span>
						<input type="text" id="fangshui" value="${elem.fangshui}">
						<span>商品证书:</span>
						<input type="text" id="zhengshu" value="${elem.zhengshu}">
					</div>
					<div class="one">
						<span>商品区间:</span>
						<input type="text" id="qujian" value="${elem.qujian}">
						<span>应用场景:</span>
						<input type="text" id="changjing" value="${elem.changjing}">
						<span>商品功能:</span>
						<input type="text" id="gongneng" value="${elem.gongneng}">
						<span>商品分区:</span>
						<input type="text" id="new" value="">
					</div>
					
					<button class="changeBtns" data-id="${elem._id}">修改</button>
					<button class="close">取消</button>
				`
			}

			$('.qwe').click(function(){
				$.ajax({
					type:'post',
					data:{'area':'机械表'},
					dataType:'json',
					url:erp.baseUrl + 'gainProductByarea',
					success:function(response){
						console.log(response)
					}
				})
			})
		})
	})
})