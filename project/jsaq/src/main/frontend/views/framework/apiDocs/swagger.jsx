import React, { Component } from 'react';
import { Page, Divider} from 'epm-ui';

const page = {
  title: "Swagger"
};

class SwaggerPage extends Component {

  render() {
	  const codeExample1 = `
package com.bonc.common.swagger;

@Configuration
@EnableSwagger2
@ComponentScan(basePackages = {"com.bonc.micro.controller"})       --默认检索路径下所有controller
public class SwaggerConfig {
	
}

		      `.trim();


	  const codeExample2 = `
1. @Api用在类上，说明该类的作用

@Api(value = "UserController", description = "用户相关api")

2. @ApiOperation
用在方法上，说明方法的作用

@ApiOperation(value = "查找用户", notes = "查找用户", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

3. @ApiImplicitParams
用在方法上包含一组参数说明

4. @ApiImplicitParam
用在@ApiImplicitParams注解中，指定一个请求参数的各个方面
paramType：参数放在哪个地方
header–>请求参数的获取：@RequestHeader
query–>请求参数的获取：@RequestParam
path（用于restful接口）–>请求参数的获取：@PathVariable
body（不常用）
form（不常用）
name：参数名
dataType：参数类型
required：参数是否必须传
value：参数的意思
defaultValue：参数的默认值

@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "唯一id", required = true, dataType = "Long", paramType = "path"),
})

5. @ApiResponses
用于表示一组响应

6. @ApiResponse
用在@ApiResponses中，一般用于表达一个错误的响应信息
code：数字，例如400
message：信息，例如”请求参数没填好”
response：抛出异常的类

@ApiResponses(value = {  
          @ApiResponse(code = 400, message = "No Name Provided")  
  })
  
7. @ApiModel
描述一个Model的信息（这种一般用在post创建的时候，使用@RequestBody这样的场景，请求参数无法使用@ApiImplicitParam注解进行描述的时候）

@ApiModel(value = "用户实体类")

8. @ApiModelProperty
描述一个model的属性
@ApiModelProperty(value = "登录用户")
    `.trim();
		  
    return (
        <Page>
        <Divider />
        <h1>{ page.title }</h1>
        
        <Divider />
	        <h3>
	    	配置
	    	</h3>
		    <Divider />
		    <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
		    <pre>
		        <code className="xml">
		          <h4>{ codeExample1 }</h4>
		        </code>
		    </pre>
		    </div>
		    <Divider />
		    
	        <h3>
	        	相关注解
	        </h3>
	        <Divider />
	        <pre>
		        <code className="xml">
		          <h4>{ codeExample2 }</h4>
		        </code>
	        </pre>
	        <Divider />
	        <h3>
        	效果图
        	</h3>
        	<img src={`${this.props.site.baseContextPath}/style/demo/image/swagger.png`} />
        </Page>
    );
  }
}

SwaggerPage.epmUIPage = page;

export default SwaggerPage;
export { SwaggerPage };