// Backbone Model

var Book = Backbone.Model.extend({
	defaults: {
		name: '',
		author: '',
		price1: ''
	}
});

// Backbone Collection

var Books = Backbone.Collection.extend({});



var books = new Books();

// Backbone View for one book

var BookView = Backbone.View.extend({
	model: new Book(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.books-list-template').html());
	},
	events: {
		'click .edit-book': 'edit',
		'click .update-book': 'update',
		'click .cancel': 'cancel',
		'click .delete-book': 'delete'
	},
	
	edit: function() {
		$('.edit-book').hide();
		$('.delete-book').hide();
		this.$('.update-book').show();
		this.$('.cancel').show();

		var name = this.$('.name').html();
		var author = this.$('.author').html();
		var price1 = this.$('.price1').html();

		this.$('.name').html('<input type="text" class="form-control name-update" value="' + name + '">');
		this.$('.author').html('<input type="text" class="form-control author-update" value="' + author + '">');
		this.$('.price1').html('<input type="text" class="form-control price1-update" value="' + price1 + '">');
	},
	update: function() {
		this.model.set('name', $('.name-update').val());
		this.model.set('author', $('.author-update').val());
		this.model.set('price1', $('.price1-update').val());
	},
	cancel: function() {
		booksView.render();
	},
	delete: function() {
	this.model.destroy();},
	
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});



var BooksView = Backbone.View.extend({
	model: books,
	el: $('.books-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		this.model.on('remove', this.render, this);
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(book) {
			self.$el.append((new BookView({model: book})).render().$el);
		});
		return this;
	}
});

var booksView = new BooksView();

$(document).ready(function() {
	$('.add-books').on('click', function() {
		var book = new Book({
			name: $('.name-input').val(),
			author: $('.author-input').val(),
			price1: $('.price1-input').val()
		});
		$('.name-input').val(),
		$('.title-input').val('');
		cost: $('.price1-input').val()
		
		console.log(book.toJSON());
		books.add(book);
	})
})