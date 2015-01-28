# encoding: utf-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.delete_all
u1 = User.create(:email => "email@email.com", :password => "123", :password_confirmation => "123", :app_url => "testsajt@test.com" )

ApiKey.delete_all
ak1 = ApiKey.create(:api_key => "Testnyckel1")

Admin.delete_all
admin1 = Admin.create(:username => "Admin", :password => "123", :password_confirmation => "123")

admin1.api_keys << ak1
u1.api_key = ak1
