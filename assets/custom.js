$(document).ready(function() {
  function removeUnusedImages(currentVariant){

    $('.product-gallery__thumb').find('.product__card').each((index, item)=>{
      if($(item).attr('data-img') != currentVariant){
      		$(item).css('display', 'none')
      }else{
      		$(item).css('display', 'block')
      }
    })
    
   if ($(window).width() < 1200) {
				$('.js-slick-slider').slick('unslick');
               $('.product__mobile').find('.product__gallery').find('.js-slick-slider').find('div').each((index, item)=>{
               
                $('.js-slick-slider').empty();
                $('.hidden-block').find('div').each((i, t) => {
                  if($(t).find('.object-wrap').attr('data-alt-tag') == currentVariant){
                      $(t).clone().appendTo(".js-slick-slider");
                  }
                })
                
              })
			$('.js-slick-slider').slick({ "centerPadding": "70px", "centerMode": true})
       }
    
    
    if ($(window).width() > 1200) {
    $('.product-gallery__assets-container').find('.product__card--image').each((index, item)=>{
      if($(item).attr('data-img') != currentVariant){
      		$(item).css('display', 'none')
      }else{
      	$(item).css('display', 'block')
      }
    })
    }
  
  }
  
  let currentVariant = $('.current_variant').first().text();
  removeUnusedImages(currentVariant); 
 
  
  
  $(document).on('click','.swatch-color .swatch-element',function(){
    	$('.swatch-color').find('.swatch-element').each((index, item)=>{
  	   		if($(item).attr('data-value') === $(this).attr('data-value')){
              $(item).find('input').prop('checked', true);
              $(item).find('input').addClass('selected');
              let inner_swatch_swatch =  $(item).parent().closest('.inner-swatch-product-swatch');
              inner_swatch_swatch.find('.color-title').html($(this).attr('data-value')); 

              var container = inner_swatch_swatch;
              var optionContainer = container.find('.dropdown-variants > option');
              var drop = [];
              var res;
              container.find('.swatch-bundled input:checked').each(function(){
                if($(item).find('input').prop("checked") == true){
                  drop.push($(this).val());
                }
              });
              optionContainer.each(function(){
                var options = $(this);
                var result = arraysEqual(drop, options);
                if(result) {
                  res = result;
                }
              });
              
            let inner_swatch_product = $(item).parent().closest('.inner-swatch-product-swatch').closest('.inner-swatch-product');
	  
           if(res !== undefined) {
              var select = inner_swatch_product.find('.dropdown-variants');
              var small_url = select.find("option[value=" + res +"]").data('image');
              var img_container = inner_swatch_product.find('.image-swatches');

              select.find('option').attr('selected', false);
              select.val(res).trigger('change');
              select.val(res).find("option[value=" + res +"]").attr('selected', true);

              if(small_url !== null || small_url !== undefined){
                img_container.attr('src', small_url);
              }
          	}
              
              removeUnusedImages($(this).attr('data-value')); 
            }else{
             $(item).find('input').removeAttr('checked');
              $(item).find('input').removeClass('selected');
            }
  		})
  })
 
  /*let var_blocks = [];
  let var_blocks2 = [];
  $('.bundled-blocks').find('li').each((index, item)=>{
  	   var_blocks.push($(item));
    var_blocks2.push($(item));
  })*/
  
  
  
/* var_blocks[0].find('.swatch-color').find('.swatch-element').click(function(event){
   
  	let color = $(this).attr('data-value');
    var_blocks[1].find('.swatch-color').find('.swatch-element').each((index1, item1) => {
      if($(item1).attr('data-value') === color){
      	$(item1).find('input').trigger('click');
        removeUnusedImages(color); 
      }
  })
  })
 
 var_blocks[1].find('.swatch-color').find('.swatch-element').click(function(event){
   
  	let color = $(this).attr('data-value');
    var_blocks[0].find('.swatch-color').find('.swatch-element').each((index, item) => {
      if($(item).attr('data-value') === color){
        console.log( $(item))
      	//$(item1).find('input').trigger('click');
         $(item).find('input').attr('checked', true);
         $(item).find('input').attr('class', 'selected');
        removeUnusedImages(color); 
      }
  })
  })*/
  
 
  
  
	});