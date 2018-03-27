import React, { Component } from 'react';
import { Page, Divider} from 'epm-ui';

const page = {
  title: "日志管理"
};

class LogPage extends Component {

  render() {
	  const codeExample1 = `

#logback日志 测试、开发用DEBUG，部署正式环境用INFO
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate=DEBUG
logging.file=logs/myapp.log
	

		      `.trim();


	  const codeExample2 = `
	  
	  
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
	    	<h3>
	    	application.properties文件
	    	</h3>
		    <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
		    <pre>
		        <code className="xml">
		          <h4>{ codeExample1 }</h4>
		        </code>
		    </pre>
		    </div>
		    <Divider />
		    
	        <Divider />
	        <pre>
		        <code className="xml">
		          <h4>{ codeExample2 }</h4>
		        </code>
	        </pre>
	        <Divider />
        </Page>
    );
  }
}

LogPage.epmUIPage = page;

export default LogPage;
export { LogPage };