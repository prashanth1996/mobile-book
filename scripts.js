// Backbone Model

var Mobile = Backbone.Model.extend({
	defaults: {
		company: '',
		modl: '',
		price: ''
	}
});

// Backbone Collection

var Mobiles = Backbone.Collection.extend({});



var mobiles = new Mobiles();

// Backbone View for one mobile

var MobileView = Backbone.View.extend({
	model: new Mobile(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.mobiles-list-template').html());
	},
	events: {
		'click .edit-mobile': 'edit',
		'click .update-mobile': 'update',
		'click .cancel': 'cancel',
		'click .delete-mobile': 'delete'
	},
	
	edit: function() {
		$('.edit-mobile').hide();
		$('.delete-mobile').hide();
		this.$('.update-mobile').show();
		this.$('.cancel').show();

		var company = this.$('.company').html();
		var modl = this.$('.modl').html();
		var price = this.$('.price').html();

		this.$('.company').html('<input type="text" class="form-control company-update" value="' + company + '">');
		this.$('.modl').html('<input type="text" class="form-control modl-update" value="' + modl + '">');
		this.$('.price').html('<input type="text" class="form-control price-update" value="' + price + '">');
	},
	update: function() {
		this.model.set('company', $('.company-update').val());
		this.model.set('modl', $('.modl-update').val());
		this.model.set('price', $('.price-update').val());
	},
	cancel: function() {
		mobilesView.render();
	},
	delete: function() {
	this.model.destroy();},
	
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});



var MobilesView = Backbone.View.extend({
	model: mobiles,
	el: $('.mobiles-list'),
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
		_.each(this.model.toArray(), function(mobile) {
			self.$el.append((new MobileView({model: mobile})).render().$el);
		});
		return this;
	}
});

var mobilesView = new MobilesView();

$(document).ready(function() {
	$('.add-mobiles').on('click', function() {
		var mobile = new Mobile({
			company: $('.company-input').val(),
			modl: $('.modl-input').val(),
			price: $('.price-input').val()
		});
		$('.company-input').val(),
		$('.title-input').val('');
		price: $('.price-input').val()
		
		console.log(mobile.toJSON());
		mobiles.add(mobile);
	})
})