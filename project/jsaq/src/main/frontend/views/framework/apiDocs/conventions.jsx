import React, { Component } from 'react';
import { Page, Divider} from 'epm-ui';

const page = {
  title: "编码规范"
};

class ConventionsPage extends Component {

  render() {
    return (
        <Page>
        <Divider />
          <h1>{ page.title }</h1>
          <Divider />
          <h2>命名规约</h2>
          		<h5>1.代码中的命名均不能以下划线或美元符号开始，也不能以下划线或美元符号结束。</h5>
          		<h6>反例： _name / __name / $Object / name_ / name$ / Object$</h6>
          		<Divider />
          		<h5>2.代码中的命名严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式。</h5>
          		<h6>说明：正确的英文拼写和语法可以让阅读者易于理解，避免歧义。注意，即使纯拼音命名方式也要避免采用。</h6>
          		<h6>反例： DaZhePromotion [打折] / getPingfenByName() [评分] / int 某变量 = 3</h6>
          		<h6>正例： bonc / taobao / youku / hangzhou 等国际通用的名称，可视同英文。</h6>
          		<Divider />
          		<h5>3.类名使用 UpperCamelCase 风格，必须遵从驼峰形式。</h5>
          		<h6>正例：MarcoPolo / UserDO / XmlService / TcpUdpDeal / TaPromotion</h6>
          		<h6>反例：macroPolo / UserDo / XMLService / TCPUDPDeal / TAPromotion</h6>
          		<Divider />
          		<h5>4.方法名、参数名、成员变量、局部变量都统一使用 lowerCamelCase 风格，必须遵从驼峰形式。</h5>
          		<h6>正例： localValue / getHttpMessage() / inputUserId</h6>
          		<Divider />
          		<h5>5.常量命名全部大写，单词间用下划线隔开，力求语义表达完整清楚，不要嫌名字长。</h5>
          		<h6>正例： MAX_STOCK_COUNT</h6>
          		<h6>反例： MAX_COUNT</h6>
          		<Divider />
          		<h5>6.抽象类命名使用 Abstract 或 Base 开头；异常类命名使用 Exception 结尾；</h5>
          		<h6>测试类命名以它要测试的类的名称开始，以 Test 结尾。</h6>
          		<Divider />
          		<h5>7.中括号是数组类型的一部分，数组定义如下：String[] args;</h5>
          		<h6>反例：请勿使用 String args[]的方式来定义。</h6>
          		<Divider />
          		<h5>8.包名统一使用小写开始，点分隔符之间有且仅有一个自然语义的英语单词。包名统一使用单数形式，但是类名如果有复数含义，类名可以使用复数形式。</h5>
          		<h6>正例： 应用工具类包名为 com.bonc.miscro.common.urils、类名为 MessageUtils（此规则参考spring 的框架结构）</h6>
          		<Divider />
          		<h5>9.杜绝完全不规范的缩写，避免望文不知义。</h5>
          		<h6>反例： AbstractClass“缩写”命名成 AbsClass；condition“缩写”命名成 condi，此类</h6>
          		<h6>随意缩写严重降低了代码的可阅读性。</h6>
          		<Divider />
          		<h5>10.如果使用到了设计模式，建议在类名中体现出具体模式。</h5>
          		<h6>说明：将设计模式体现在名字中，有利于阅读者快速理解架构设计思想。</h6>
          		<h6>正例：public class OrderFactory;</h6>
          		<h6>public class LoginProxy;</h6>
          		<h6>public class ResourceObserver;</h6>
          		<Divider />
          		<h5>11.接口类中的方法和属性不要加任何修饰符号（public 也不要加），保持代码的简洁性，并加上有效的 Javadoc 注释。尽量不要在接口里定义变量，如果一定要定义变量，肯定是与接口方法相关，并且是整个应用的基础常量。</h5>
          		<h6>正例：接口方法签名：void f();</h6>
          		<h6>接口基础常量表示：String COMPANY = "bonc";</h6>
          		<h6>反例：接口方法定义：public abstract void f();</h6>
          		<h6>说明：JDK8 中接口允许有默认实现，那么这个 default 方法，是对所有实现类都有价值的默认实现。</h6>
          		<Divider />
          		<h5>12. 接口和实现类的命名有两套规则：</h5>
          		<h6>1）对于 Service 和 DAO 类，基于 SOA 的理念，暴露出来的服务一定是接口，内部</h6>
          		<h6>的实现类用 Impl 的后缀与接口区别。</h6>
          		<h6>正例：CacheServiceImpl 实现 CacheService 接口。</h6>
          		<h6>2）如果是形容能力的接口名称，取对应的形容词做接口名（通常是–able 的形式）。</h6>
          		<h6>正例：AbstractTranslator 实现 Translatable。</h6>
          		<Divider />
          		<h5>13. 枚举类名建议带上 Enum 后缀，枚举成员名称需要全大写，单词间用下划线隔开。</h5>
          		<h6>说明：枚举其实就是特殊的常量类，且构造方法被默认强制是私有。</h6>
          		<h6>正例：枚举名字：DealStatusEnum，成员名称：SUCCESS / UNKOWN_REASON。</h6>
          		<Divider />
          		<h5>14. 各层命名规约：</h5>
          		<h6>A) Service/DAO 层方法命名规约</h6>
          		<h6>1） 获取单个对象的方法用 get 做前缀。</h6>
          		<h6>2） 获取多个对象的方法用 list 做前缀。</h6>
          		<h6>3） 获取统计值的方法用 count 做前缀。</h6>
          		<h6>4） 插入的方法用 save（推荐）或 insert 做前缀。</h6>
          		<h6>5） 删除的方法用 remove（推荐）或 delete 做前缀。</h6>
          		<h6>6） 修改的方法用 update 做前缀。</h6>
          		<h6>B) 领域模型命名规约</h6>
          		<h6>1） 数据对象：xxxDO，xxx 即为数据表名。</h6>
          		<h6>2） 数据传输对象：xxxDTO，xxx 为业务领域相关的名称。</h6>
          		<h6>3） 展示对象：xxxVO，xxx 一般为网页名称。</h6>
          		<h6>4） POJO 是 DO/DTO/BO/VO 的统称，禁止命名成 xxxPOJO。</h6>
          		<Divider />
          <h2>常量定义</h2>
				<h5>1.不允许出现任何魔法值（即未经定义的常量）直接出现在代码中。</h5>
				<h6>反例： String key="Id#aaa_"+tradeId；</h6>
				<h6>cache.put(key, value);</h6>
				<Divider />
				<h5>2.long 或者 Long 初始赋值时，必须使用大写的 L，不能是小写的 l，小写容易跟数字1 混淆，造成误解。</h5>
				<h6>说明：Long a = 2l; 写的是数字的 21，还是 Long 型的 2?</h6>
				<Divider />
				<h5>3.不要使用一个常量类维护所有常量，应该按常量功能进行归类，分开维护。</h5>
				<h6>如：缓存相关的常量放在类：CacheConsts 下；系统配置相关的常量放在类：ConfigConsts 下。</h6>
				<h6>说明：大而全的常量类，非得使用查找功能才能定位到修改的常量，不利于理解和维护。</h6>
				<Divider />
				<h5>4.常量的复用层次有五层：跨应用共享常量、应用内共享常量、子工程内共享常量、包内共享常量、类内共享常量。</h5>
				<h6>1） 跨应用共享常量：放置在二方库中，通常是 client.jar 中的 constant 目录下。</h6>
				<h6>2） 应用内共享常量：放置在一方库的 modules 中的 constant 目录下。</h6>
				<h6>反例：易懂变量也要统一定义成应用内共享常量，两位攻城师在两个类中分别定义了表示“是”的变量：</h6>
				<h6>类 A 中：public static final String YES = "yes";</h6>
				<h6>类 B 中：public static final String YES = "y";</h6>
				<h6>A.YES.equals(B.YES)，预期是 true，但实际返回为 false，导致产生线上问题。</h6>
				<h6>3） 子工程内部共享常量：即在当前子工程的 constant 目录下。</h6>
				<h6>4） 包内共享常量：即在当前包下单独的 constant 目录下。</h6>
				<h6>5） 类内共享常量：直接在类内部 private static final 定义。</h6>
				<Divider />
          <h2>格式规约</h2>
          		<h5>1.大括号的使用约定。如果是大括号内为空，则简洁地写成{}即可，不需要换行；如果是非空代码块则：</h5>
          		<h6>1） 左大括号前不换行。</h6>
          		<h6>2） 左大括号后换行。</h6>
          		<h6>3） 右大括号前换行。</h6>
          		<h6>4） 右大括号后还有 else 等代码则不换行；表示终止右大括号后必须换行。</h6>
          		<Divider />
				<h5>2. 左括号和后一个字符之间不出现空格；同样，右括号和前一个字符之间也不出现空格。</h5>
				<Divider />
				<h5>3.if/for/while/switch/do 等保留字与左右括号之间都必须加空格。</h5>
				<Divider />
				<h5>4.任何运算符左右加一个空格。</h5>
				<h6>说明：运算符包括赋值运算符=、逻辑运算符&&、加减乘除符号、三目运行符等。</h6>
				<Divider />
				<h5>5.单行字符数限制不超过 120 个，超出需要换行，换行时遵循如下原则：</h5>
				<h6>1） 第二行相对第一行缩进 4 个空格，从第三行开始，不再继续缩进。</h6>
				<h6>2） 运算符与下文一起换行。</h6>
				<h6>3） 方法调用的点符号与下文一起换行。</h6>
				<h6>4） 在多个参数超长，逗号后进行换行。</h6>
				<h6>5） 在括号前不要换行。</h6>
				<Divider />
				<h5>6.方法参数在定义和传入时，多个参数逗号后边必须加空格。</h5>
				<h6>正例：下例中实参的"a",后边必须要有一个空格。</h6>
				<h6>method("a", "b", "c");</h6>
				<Divider />
				<h5>7.方法体内的执行语句组、变量的定义语句组、不同的业务逻辑之间或者不同的语义之间插入一个空行。相同业务逻辑和语义之间不需要插入空行。</h5>
				<h6>说明：没有必要插入多行空格进行隔开。</h6>
				<Divider />
          <h2>编程规约</h2>
          <h5>1.避免通过一个类的对象引用访问此类的静态变量或静态方法，无谓增加编译器解析成本，直接用类名来访问即可。</h5>
          <Divider />
          <h5>2.所有的覆写方法，必须加@Override 注解。</h5>
          <h6>反例：getObject()与 get0bject()的问题。一个是字母的 O，一个是数字的 0，加@Override可以准确判断是否覆盖成功。另外，如果在抽象类中对方法签名进行修改，其实现类会马上编译报错。</h6>
          <Divider />
          <h5>3. 相同参数类型，相同业务含义，才可以使用 Java 的可变参数，避免使用 Object。</h5>
          <h6>说明：可变参数必须放置在参数列表的最后。（提倡同学们尽量不用可变参数编程）</h6>
          <h6>正例：public User getUsers(String type, Integer... ids)</h6>
          <Divider />
          <h5>4. Object 的 equals 方法容易抛空指针异常，应使用常量或确定有值的对象来调用equals。</h5>
          <h6>正例： "test".equals(object);</h6>
          <h6>反例： object.equals("test");</h6>
          <h6>说明：推荐使用 java.util.Objects#equals （JDK7 引入的工具类）</h6>
          <Divider />
          <h5>5. 所有的相同类型的包装类对象之间值的比较，全部使用 equals 方法比较。</h5>
          <h6>说明：对于 Integer var=?在-128 至 127 之间的赋值，Integer 对象是在IntegerCache.cache 产生，
        		  会复用已有对象，这个区间内的 Integer 值可以直接使用==进行判断，但是这个区间之外的所有数据，
        		  都会在堆上产生，并不会复用已有对象，这是一个大坑，
        		  推荐使用 equals 方法进行判断</h6>
          <Divider />
          <h5>6.使用索引访问用 String 的 split 方法得到的数组时，需做最后一个分隔符后有无内容的检查，否则会有抛 IndexOutOfBoundsException 的风险。</h5>
          <h6>String str = "a,b,c,,";</h6>
          <h6>String[] ary = str.split(",");</h6>
          <h6>预期大于 3，结果是 3</h6>
          <h6>System.out.println(ary.length);</h6>
          <Divider />
          <h5>7.当一个类有多个构造方法，或者多个同名方法，这些方法应该按顺序放置在一起，便于阅读。</h5>
          <Divider />
          <h5>8.循环体内，字符串的联接方式，使用 StringBuilder 的 append 方法进行扩展。</h5>
          <h6>说明：反编译出的字节码文件显示每次循环都会 new 出一个 StringBuilder 对象，然后进行append 操作，最后通过 toString 方法返回 String 对象，造成内存资源浪费。</h6>
          <Divider />
          <h5>9.final 可提高程序响应效率，声明成 final 的情况：</h5>
          <h6>1） 不需要重新赋值的变量，包括类属性、局部变量。</h6>
          <h6>2） 对象参数前加 final，表示不允许修改引用的指向。</h6>
          <h6>3） 类方法确定不允许被重写。</h6>
          <Divider />
          <h5>10.慎用 Object 的 clone 方法来拷贝对象。</h5>
          <h6>说明：对象的 clone 方法默认是浅拷贝，若想实现深拷贝需要重写 clone 方法实现属性对象的拷贝。</h6>
          <Divider />
          <h5>11.类成员与方法访问控制从严：</h5>
          <h6>1） 如果不允许外部直接通过 new 来创建对象，那么构造方法必须是 private。</h6>
          <h6>2） 工具类不允许有 public 或 default 构造方法。</h6>
          <h6>3） 类非 static 成员变量并且与子类共享，必须是 protected。</h6>
          <h6>4） 类非 static 成员变量并且仅在本类使用，必须是 private。</h6>
          <h6>5） 类 static 成员变量如果仅在本类使用，必须是 private。</h6>
          <h6>6） 若是 static 成员变量，必须考虑是否为 final。</h6>
          <h6>7） 类成员方法只供类内部调用，必须是 private。</h6>
          <h6>8） 类成员方法只对继承类公开，那么限制为 protected。</h6>
          <h6>说明：任何类、方法、参数、变量，严控访问范围。过宽泛的访问范围，不利于模块解耦。思考：如果是一个 private 的方法，想删除就删除，可是一个 public 的 Service 方法，或者一个 public 的成员变量，删除一下，不得手心冒点汗吗？变量像自己的小孩，尽量在自己的视线内，变量作用域太大，如果无限制的到处跑，那么你会担心的。</h6>
          <Divider />
          <h2>集合处理</h2>
		  <h5>1.关于 hashCode 和 equals 的处理，遵循如下规则：</h5>
		  <h6>1） 只要重写 equals，就必须重写 hashCode。</h6>
		  <h6>2） 因为 Set 存储的是不重复的对象，依据 hashCode 和 equals 进行判断，所以 Set 存储的对象必须重写这两个方法。</h6>
		  <h6>3） 如果自定义对象做为 Map 的键，那么必须重写 hashCode 和 equals。</h6>
          <h6>正例：String 重写了 hashCode 和 equals 方法，所以我们可以非常愉快地使用 String 对象作为 key 来使用。</h6>
          <Divider />
          <h5>2. ArrayList 的 subList 结果不可强转成 ArrayList，否则会抛出 ClassCastException</h5>
          <h6>异常：java.util.RandomAccessSubList cannot be cast to java.util.ArrayList ;</h6>
          <h6>说明：subList 返回的是 ArrayList 的内部类 SubList，并不是 ArrayList ，而是ArrayList 的一个视图，对于 SubList 子列表的所有操作最终会反映到原列表上。</h6>
          <Divider />
          <h5>3.在 subList 场景中，高度注意对原集合元素个数的修改，会导致子列表的遍历、增加、删除均产生 ConcurrentModificationException 异常。</h5>
          <Divider />
          <h5>4.不要在 foreach 循环里进行元素的 remove/add 操作。remove 元素请使用 Iterator方式，如果并发操作，需要对 Iterator 对象加锁。</h5>
		  
          <h5>5.集合初始化时，尽量指定集合初始值大小。</h5>
          <h6>说明：ArrayList 尽量使用 ArrayList(int initialCapacity) 初始化。</h6>
          <Divider />
          <h5>6.使用 entrySet 遍历 Map 类集合 KV，而不是 keySet 方式进行遍历。</h5>
          <h6>说明：keySet 其实是遍历了 2 次，一次是转为 Iterator 对象，另一次是从 hashMap 中取出key 所对应的 value。而 entrySet 只是遍历了一次就把 key 和 value 都放到了 entry 中，效率更高。如果是 JDK8，使用 Map.foreach 方法。</h6>
          <h6>正例：values()返回的是 V 值集合，是一个 list 集合对象；keySet()返回的是 K 值集合，是一个 Set 集合对象；entrySet()返回的是 K-V 值组合集合。</h6>
          <Divider />
          <h5>7.高度注意 Map 类集合 K/V 能不能存储 null 值的情况。</h5>
          <h6>反例： 由于 HashMap 的干扰，很多人认为 ConcurrentHashMap 是可以置入 null 值，注意存储null 值时会抛出 NPE 异常。</h6>
          <Divider />
          <h5>8.合理利用好集合的有序性(sort)和稳定性(order)，避免集合的无序性(unsort)和不稳定性(unorder)带来的负面影响。</h5>
          <h6>说明：稳定性指集合每次遍历的元素次序是一定的。有序性是指遍历的结果是按某种比较规则依次排列的。</h6>
          <h6>如：ArrayList 是 order/unsort；HashMap 是 unorder/unsort；TreeSet 是order/sort。</h6>
          <Divider />
          <h5>10.用 Set 元素唯一的特性，可以快速对一个集合进行去重操作，避免使用 List 的contains 方法进行遍历、对比、去重操作。</h5>
          <Divider />
          <h2>并发处理</h2>
          <h5>1.获取单例对象需要保证线程安全，其中的方法也要保证线程安全。</h5>
          <h6>说明：资源驱动类、工具类、单例工厂类都需要注意。</h6>
          <Divider />
          <h5>2.创建线程或线程池时请指定有意义的线程名称，方便出错时回溯。</h5>
          <h6>public class TimerTaskThread extends Thread ｛</h6>
          <h6>public TimerTaskThread()｛</h6>
          <h6></h6>
          <h6>｝</h6>
          <h6>super.setName("TimerTaskThread");</h6>
          <h6>...</h6>
          <h6>｝</h6>
          <Divider />
          <h5>3. 线程池不允许使用 Executors 去创建，而是通过 ThreadPoolExecutor 的方式，这样的处理方式让写的同学更加明确线程池的运行规则，规避资源耗尽的风险。</h5>
          <h6>说明：Executors 返回的线程池对象的弊端如下：</h6>
          <h6>1）FixedThreadPool 和 SingleThreadPool:</h6>
          <h6>允许的请求队列长度为 Integer.MAX_VALUE，可能会堆积大量的请求，从而导致 OOM。</h6>
    	  <h6>2）CachedThreadPool 和 ScheduledThreadPool:</h6>
          <h6>允许的创建线程数量为 Integer.MAX_VALUE，可能会创建大量的线程，从而导致 OOM。</h6>
          <Divider />
          <h5>4.高并发时，同步调用应该去考量锁的性能损耗。能用无锁数据结构，就不要用锁；能锁区块，就不要锁整个方法体；能用对象锁，就不要用类锁。</h5>
          <Divider />
          <h5>5.对多个资源、数据库表、对象同时加锁时，需要保持一致的加锁顺序，否则可能会造成死锁。</h5>
          <h6>说明：线程一需要对表 A、B、C 依次全部加锁后才可以进行更新操作，那么线程二的加锁顺序也必须是 A、B、C，否则可能出现死锁。</h6>
          <Divider />
          <h5>6.多线程并行处理定时任务时，Timer 运行多个 TimeTask 时，只要其中之一没有捕获抛出的异常，其它任务便会自动终止运行，使用 ScheduledExecutorService 则没有这个问题。</h5>
          <Divider />
          <h5>7.使用 CountDownLatch 进行异步转同步操作，每个线程退出前必须调用 countDown方法，线程执行代码注意 catch 异常，确保 countDown 方法可以执行，避免主线程无法执行至 countDown 方法，直到超时才返回结果。</h5>
          <h6>说明：注意，子线程抛出异常堆栈，不能在主线程 try-catch 到。</h6>
          <Divider />
          <h5>8.避免 Random 实例被多线程使用，虽然共享该实例是线程安全的，但会因竞争同一seed 导致的性能下降。</h5>
          <h6>说明：Random 实例包括 java.util.Random 的实例或者 Math.random()实例。</h6>
          <h6>正例：在 JDK7 之后，可以直接使用 API ThreadLocalRandom，在 JDK7 之前，可以做到每个线程一个实例。</h6>
          <Divider />
          <h5>9.通过双重检查锁（double-checked locking）（在并发场景）实现延迟初始化的优化问题隐患(可参考 The "Double-Checked Locking is Broken" Declaration),推荐问题解决方案中较为简单一种（适用于 JDK5 及以上版本），将目标属性声明为 volatile 型。</h5>
          <h6>反例：</h6>
          <h6>class Foo ｛</h6>
          <h6>private Helper helper = null;</h6>
          <h6>public Helper getHelper() ｛</h6>
          <h6>if (helper == null)</h6>
          <h6>synchronized(this) ｛</h6>
          <h6> if (helper == null)</h6>
          <h6>helper = new Helper();</h6>
          <h6>｝</h6>
          <h6>return helper;</h6>
          <h6>｛</h6>
          // other functions and members...
          <h6>｝</h6>
          <Divider />
          <h5>10. volatile 解决多线程内存不可见问题。</h5>
          <h6>对于一写多读，是可以解决变量同步问题，但是如果多写，同样无法解决线程安全问题。</h6>
          <h6>如果是 count++操作，使用如下类实现：</h6>
          <h6>AtomicInteger count = new AtomicInteger(); count.addAndGet(1); 如果是 JDK8，推荐使用 LongAdder 对象，比 AtomicLong 性能更好（减少乐观锁的重试次数）。</h6>
          <Divider />
          <h5>11.HashMap 在容量不够进行 resize 时由于高并发可能出现死链，导致 CPU 飙升，在开发过程中注意规避此风险。</h5>
          <Divider />
          <h5>12.ThreadLocal 无法解决共享对象的更新问题</h5>
          <h6>ThreadLocal 对象建议使用 static修饰。这个变量是针对一个线程内所有操作共有的，所以设置为静态变量，所有此类实例共享此静态变量 ，也就是说在类第一次被使用时装载，只分配一块存储空间，所有此类的对象(只要是这个线程内定义的)都可以操控这个变量。</h6>
          <Divider />
          <h2>控制语句</h2>
          
          <h5>1.在一个 switch 块内，每个 case 要么通过 break/return 等来终止，要么注释说明程序将继续执行到哪一个 case 为止；</h5>
          <h5>在一个 switch 块内，都必须包含一个 default 语句并且放在最后，即使它什么代码也没有。</h5>
          <Divider />
          <h5>2.在 if/else/for/while/do 语句中必须使用大括号，即使只有一行代码。</h5>
          <Divider />
          <h5>3.推荐尽量少用 else， if-else 的方式</h5>
          <h6>可以改写成：</h6>
          <h6>if(condition)｛</h6>
          <h6>...</h6>
          <h6>return obj;</h6>
          <h6>｝</h6>
          <h6>接着写 else 的业务逻辑代码;</h6>
          <h6>说明：如果非得使用 if()...else if()...else...方式表达逻辑，【强制】请勿超过 3 层，</h6>
          <h6>超过请使用状态设计模式。</h6>
          <h6>正例：逻辑上超过 3 层的 if-else 代码可以使用卫语句，或者状态模式来实现。</h6>
          <Divider />
          <h5>4. 除常用方法（如 getXxx/isXxx）等外，不要在条件判断中执行其它复杂的语句，将复杂逻辑判断的结果赋值给一个有意义的布尔变量名，以提高可读性。</h5>
          <h6>说明：很多 if 语句内的逻辑相当复杂，阅读者需要分析条件表达式的最终结果，才能明确什么样的条件执行什么样的语句，那么，如果阅读者分析逻辑表达式错误呢？</h6>
          <h6>正例：</h6>
          <h6>伪代码如下</h6>
          <h6>boolean existed = (file.open(fileName, "w") != null) && (...) || (...);</h6>
          <h6>if (existed) ｛</h6>
          <h6>...</h6>
          <h6>｝</h6>
          <h6>反例：</h6>
          <h6>if ((file.open(fileName, "w") != null) && (...) || (...)) ｛</h6>
          <h6>...</h6>
          <h6>｝</h6>
          <Divider />
          <h5>5. 循环体中的语句要考量性能，如定义对象、变量、获取数据库连接，进行不必要的 try-catch 操作（这个 try-catch 是否可以移至循环体外）。</h5>
          <Divider />
          <h2>注释规约</h2>
          <h5>1. 类、类属性、类方法的注释必须使用 Javadoc 规范，使用/**内容*/格式，不得使用//xxx 方式。</h5>
          <h6>说明：在 IDE 编辑窗口中，Javadoc 方式会提示相关注释，生成 Javadoc 可以正确输出相应注释；在 IDE 中，工程调用方法时，不进入方法即可悬浮提示方法、参数、返回值的意义，提高阅读效率。</h6>
          <Divider />
          <h5>2. 所有的抽象方法（包括接口中的方法）必须要用 Javadoc 注释、除了返回值、参数、异常说明外，还必须指出该方法做什么事情，实现什么功能。</h5>
          <h6>说明：对子类的实现要求，或者调用注意事项，请一并说明。</h6>
          <Divider />
          <h5>3. 所有的类都必须添加创建者信息。</h5>
          <Divider />
          <h5>4. 方法内部单行注释，在被注释语句上方另起一行，使用//注释。方法内部多行注释使用/* */注释，注意与代码对齐。</h5>
          <Divider />
          <h5>5. 所有的枚举类型字段必须要有注释，说明每个数据项的用途。</h5>
          <Divider />
          <h5>6. 与其“半吊子”英文来注释，不如用中文注释把问题说清楚。专有名词与关键字保持英文原文即可。</h5>
          <h6>反例：“TCP 连接超时”解释成“传输控制协议连接超时”，理解反而费脑筋。</h6>
          <Divider />
          <h5>7. 代码修改的同时，注释也要进行相应的修改，尤其是参数、返回值、异常、核心逻辑等的修改。</h5>
          <h6>说明：代码与注释更新不同步，就像路网与导航软件更新不同步一样，如果导航软件严重滞后，就失去了导航的意义。</h6>
          <Divider />
          <h5>8. 注释掉的代码尽量要配合说明，而不是简单的注释掉。</h5>
          <h6>说明：代码被注释掉有两种可能性：1）后续会恢复此段代码逻辑。2）永久不用。前者如果没有备注信息，难以知晓注释动机。后者建议直接删掉（代码仓库保存了历史代码）。</h6>
          <Divider />
          <h5>9. 对于注释的要求：</h5>
          <h6>第一、能够准确反应设计思想和代码逻辑；</h6>
          <h6>第二、能够描述业务含义，使别的程序员能够迅速了解到代码背后的信息。完全没有注释的大段代码对于阅读者形同天书，注释是给自己看的，即使隔很长时间，也能清晰理解当时的思路；注释也是给继任者看的，使其能够快速接替自己的工作。</h6>
          <Divider />
          <h5>10. 好的命名、代码结构是自解释的，注释力求精简准确、表达到位。</h5>
          <h6>避免出现注释的一个极端：过多过滥的注释，代码的逻辑一旦修改，修改注释是相当大的负担。</h6>
          <Divider />
          <h2>其它</h2>
          <h5>1. 在使用正则表达式时，利用好其预编译功能，可以有效加快正则匹配速度。</h5>
          <h6>说明：不要在方法体内定义：Pattern pattern = Pattern.compile(规则);</h6>
          <Divider />
          <h5>2.注意 Math.random() </h5>
          <h6>这个方法返回是 double 类型，注意取值的范围 0≤x＜1（能够取到零值，注意除零异常），如果想获取整数类型的随机数，不要将 x 放大 10 的若干倍然后取整，直接使用 Random 对象的 nextInt 或者 nextLong 方法。</h6>
          <Divider />
          <h5>3.获取当前毫秒数 System.currentTimeMillis(); </h5>
          <h6>而不是 new Date().getTime();</h6>
          <h6>说明：如果想获取更加精确的纳秒级时间值，用 System.nanoTime()。在 JDK8 中，针对统计时间等场景，推荐使用 Instant 类。</h6>
          <Divider />
          <h5>4.任何数据结构的构造或初始化，都应指定大小，避免数据结构无限增长吃光内存。</h5>
          <Divider />
          <h5>5.对于“明确停止使用的代码和配置”，如方法、变量、类、配置文件、动态配置属性等要坚决从程序中清理出去，避免造成过多垃圾。</h5>
          
        </Page>
    );
  }

}

ConventionsPage.epmUIPage = page;

export default ConventionsPage;
export { ConventionsPage };