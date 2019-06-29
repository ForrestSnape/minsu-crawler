package main

import (
	"minsu/minsu-crawler/engine"
	"minsu/minsu-crawler/zhenai/parser"
)

func main() {
	engine.Run(engine.Request{
		Url:        "https://www.xiaozhu.com/xz_web2/order/pages/landlord/orderList.html",
		ParserFunc: parser.ParseCityList,
	})
}
