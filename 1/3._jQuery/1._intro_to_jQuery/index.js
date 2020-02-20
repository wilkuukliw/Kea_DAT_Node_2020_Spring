$("#teleport-btn").click(() => {
   const temp = $(".input-right").val();
   $(".input-right").val($(".input-left").val());
   $(".input-left").val(temp);

});