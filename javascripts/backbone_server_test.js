$(document).ready(function() {
	$("#test-canvas").on('click', function() {
		
		news = new NewsCollection();
		news.fetch();
		debugLn(news);
		
	});
	
	var message = $$({txt:'Hello World!<br /> This will go on a new line.'},'<div data-bind="txt" data-type="html"/>');
	$$.document.append(message);
	
	window.NewsItem = Backbone.Model.extend({
		
	});
	window.NewsCollection = Backbone.Collection.extend({
		model: NewsItem,
		
		//public_api_key: 'A public api key from topics.io',
		//url_base: 'http://api.topics.io/topics/news/v1/?page=1&auth_api_key=',
		url_base: 'https://api.facebook.com/method/users.getInfo?uids=4&fields=name&access_token=AAAAAAITEghMBAIye8iTErR6YxvL3T4VCAphQjaifu42i40qhjds6G9tWzdHwQzbWxJmYQNh2LHU8Wzqo8zJSLLM7fxuUhkBaHxVc1QZDZD&format=json',
		
		url: function() {
			return this.url_base;// + this.public_api_key
		},
		
		parse: function(response) {
			stringify(response);
			return response.request_args;
		}
	});
});