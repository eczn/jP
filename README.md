# jP
　　jP利用浏览器内置的播放器 构建而成。 
　　唯一的特色就是可以根据音频信息绘图。 


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
jPen.circleM();
								// 可以同时执行。。

```

