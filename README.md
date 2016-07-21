# 编程的练习。。。 

面向对象。。。 


用法： 

``` html
<audio id="jPA" src="Dreaming.mp3" controls='controls'></audio>
<canvas style="position: absolute;top: 0;left: 0;z-index: -99" id="jPC"></canvas>
```

然后记得：
``` html
<script type="text/javascript" src="jP.js"></script>
```

最后

``` javascript
var jP = new jPCC('jPA','jPC'); // jPCC(id_of_domAudio,id_of_domCanvas); 
var jPen = new jPenCC(jP); 		// jPenCC(一个jP对象) , 启用绘图

jPen.circleS(); 				// 绘图动画 circleS
jPen.line(); 					// 绘图动画 line 
								// 不要同时两个都执行 会出错 

```
