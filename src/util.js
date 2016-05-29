/*！
 * author:johnnynode@gmail.com
 * des: web libary
 */

(function (w) {
    var Util = function () {}
    Util.prototype = {
        elements:[],
        extend:function(target,source){
            for(var i  in source){
                target[i] = source[i];
            }
            return target;
        }
    }
    var $$ = new Util();

    /* 用extend实现模块化管理 */

    /* 对字符串的操作 */
    $$.extend($$,{
        ltrim:function(str){
            return str.replace(/(^\s*)/,'');
        },
        rtrim:function(str){
            return str.replace(/(\s*$)/,'');
        },
        trim:function(str){
            return str.replace(/(^\s*)|(\s*$)/g,'');
        },
        formateString:function(str,data){
            return str.replace(/@\((\w+)\)/g,function(match,key){
                return typeof data[key] === 'undefined'?'':data[key];
            });
        },
        /* 此处依赖art-template插件 */
        bindAtrtemplate:function(str,data){
            var render = template.compile(str);
            var html = render(data);
            return html;
        },
        /* 查询字符串 */
        querystring:function(){
            var str = window.location.search.substring(1);
            var arr = str.split('&');
            var json = {};
            for(var i=0; i<arr.length;i++){
                var c = arr[i].indexOf('=');
                if(c == -1) continue;
                var d = arr[i].substring(0,c);
                var e = arr[i].substring(c+1);
                json[d] = e;
            }
            return json;
        }
    });

    /* 数据类型检测模块 */
    $$.extend($$,{
        isNumber:function(val){
            return typeof val === 'number';
        },
        isBoolean:function(val){
            return typeof val === 'boolean';
        },
        isString:function(val){
            return typeof val === 'string';
        },
        isUndefined:function(val){
            return typeof val === 'undefined';
        },
        isObj:function(str){
            if(str === null || typeof str === 'undefined'){
                return false;
            }
            return typeof str === 'object';
        },
        isNull:function(val){
            return val === null;
        },
        isArray:function(arr){
            return Object.prototype.toString.call(arr) === '[object Array]';
        }
    });

    /* 选择器模块 */
    $$.extend($$,{
        $id:function(eleId){
            return document.getElementById(eleId);
        },
        $tag:function(tag,id){
            function getDom(id){
                var dom;
                /* 如果是字符串，默认按照id来选择dom */
                if($$.isString(id)){
                    dom = document.getElementById(id);
                }else{
                    dom = id;
                }
                return dom;
            }
            function getElements(context,tag){
                if(context){
                    return context.getElementsByTagName(tag);
                }else{
                    return document.getElementsByTagName(tag);
                }
            }
            var dom = getDom(id);
            var eles = getElements(dom,tag);
            return eles;
        },
        $class:function(classname,context){
            if(context){
                if($$.isString(context)){
                    context = $$.$id(context);
                }
            }else{
                context = document;
            }
            /*需要判断原生是否支持*/
            if(document.getElementsByClassName){
                return context.getElementsByClassName(classname);
            }else{
                // 需要手动解决浏览器兼容
                var eles = [];
                var dom = context.getElementsByTagName('*');
                for(var i=0; i<dom.length; i++){
                    var itemClassArr = dom[i].className.split(' ');
                    for(var j=0;j<itemClassArr.length;j++){
                        if(itemClassArr[j] === classname){
                            eles.push(dom[i]);
                        }
                    }
                }
                return eles;
            }
        }

    })

    // 最后暴露出去核心对象
    w.$$ = w.Util = $$;

})(window);
