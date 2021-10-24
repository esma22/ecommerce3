import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './css/style.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import '@fortawesome/fontawesome-free/js/all.min';

$(document).ready(function(){
    $('[data-toggle=tooltip]').tooltip();
     
    $('.add-to-cart-btn').click(function(){
       alert("اضيف المنتج الى عربة الشراء");
    });
    $("#copyright").text("جميع الحقوق محفوظة للمتجر لسنة "+ new Date().getFullYear());
    $('.product-option input[type="radio"]').change(function(){
        $(this).parents(".product-option").siblings().removeClass("active");
        $(this).parents('.product-option').addClass('active');
    });
});