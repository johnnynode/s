/*!
 *  created by johnnynode
 */
void function(w){
    /* 创建工具类 */
    var webUtil = function(){};
    
    webUtil.prototype = {
        /* placeholder函数封装 */
        placeHolder:function (id,str) {
            var dom = document.getElementById(id);
            dom.onfocus = function(){
                trim(dom);
                // rgb的方式为了兼容chrome
                if(dom.value === str && (dom.style.color === '#ccc' || dom.style.color === 'rgb(204, 204, 204)')){
                    dom.value = '';
                }
                dom.style.color = '#333';
            }
            dom.onblur = function(){
                trim(dom);
                console.log(dom.value);
                if(!dom.value){
                    dom.value = str;
                    dom.style.color = '#ccc';
                }
            }
            function trim(obj){
                if(typeof obj === 'object'){
                    // use regular expression to trim two sides space
                    obj.value = obj.value.replace(/^\s+|\s+$/g,"");
                }
            }
        },
        /* 5 s 倒计时跳转封装 */
        doRedirect:function (eleId, URL) {
            var dom = document.getElementById('demo');
            var num = 5;
            (function () {
                dom.innerHTML = num;
                num--;
                /*  每秒钟调用函数自身一次  */
                setTimeout(arguments.callee, 1000); 
                if (num === 0) {
                    window.location.href = URL;
                }
            })(); 
        }
    }
    
    var $webUtil = new webUtil();
    w.$webUtil = $webUtil;
}(window)