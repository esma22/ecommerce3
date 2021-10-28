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
     // عندما تتغير كمية المنتج
  $('[data-product-quantity]').on( "change",function() {
      
    // اجلب الكمية الجديدة
    var newQuantity = $(this).val();

    // ابحث عن السّطر الّذي يحتوي معلومات هذا المُنتج
    var $parent = $(this).parents('[data-product-info]');

    // اجلب سعر القطعة الواحدة من معلومات المنتج
    var pricePerUnit = $parent.attr('data-product-price');

    // السعر الإجمالي للمنتج هو سعر القطعة مضروبًا بعددها
    var totalPriceForProduct = newQuantity * pricePerUnit;

    // عين السعر الجديد ضمن خليّة السّعر الإجمالي للمنتج في هذا السطر
    $parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

    // حدث السعر الإجمالي لكل المُنتجات
    calculateTotalPrice();
});
    $('[data-remove-from-cart]').click(function(){
      $(this).parents('[data-product-info]').remove();
      calculateTotalPrice();
    });
function calculateTotalPrice() {
      
    // أنشئ متغيّرًا جديدًا لحفظ السعر الإجمالي
    var totalPriceForAllProducts = 0;

    // لكل سطر يمثل معلومات المُنتج في الصّفحة
    $('[data-product-info]').each(function() {

        // اجلب سعر القطعة الواحدة من الخاصّية الموافقة
        var pricePerUnit = $(this).attr('data-product-price');

        // اجلب كمية المنتج من حقل اختيار الكمية
        var quantity = $(this).find('[data-product-quantity]').val();

        var totalPriceForProduct = pricePerUnit * quantity;

        // أضف السعر الإجمالي لهذا المنتج إلى السعر الإجمالي لكل المُنتجات، واحفظ القيمة في المتغير نفسه
        totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);
    });

      // حدث السعر الإجمالي لكل المُنتجات في الصفحة
    $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
  }
  var citiesByCountry = {
    sa: ['الرياض','جدة'],
    eg: ['القاهرة','الإسكندرية'],
    jo: ['عمان','الزرقاء'],
    sy: ['دمشق','حلب','حماه']
};

// عندما يتغير البلد
$('#form-checkout select[name="country"]').on( "change",function() {
  // اجلب رمز البلد
  var country = $(this).val();

  // اجلب مدن هذا البلد من المصفوفة
  var cities = citiesByCountry[country];

  // فرّغ قائمة المدن
  $('#form-checkout select[name="city"]').empty();
  $('#form-checkout select[name="city"]').append(
      '<option disabled selected value="">اختر المدينة</option>'
  );

  // أضف المدن إلى قائمة المدن
  cities.forEach(function(city) {
    var newOption = $('<option></option>');
    newOption.text(city);
    newOption.val(city);
    $('#form-checkout select[name="city"]').append(newOption);
  });
});

      // عندما تتغير طريقة الدفع
      $('#form-checkout input[name="payment_method"]').on( "change",function() {

        // اجلب القيمة المُختارة حاليًا
        var paymentMethod = $(this).val();
    
        if (paymentMethod === 'on_delivery') {
    
          // إذا كانت عند الاستلام، فعطّل حقول بطاقة الائتمان
          $('#credit-card-info input').prop('disabled', true);
    
        } else {
    
          // وإلا ففعلّها
          $('#credit-card-info input').prop('disabled', false);
        }
      
        // بدل معلومات بطاقة الائتمان بين الظهور والإخفاء
        $('#credit-card-info').toggle();
      });
    });
