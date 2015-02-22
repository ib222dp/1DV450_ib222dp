# encoding: utf-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.delete_all
u1 = User.create(:username => "User1", :email => "email@email.com", :password => "123", :password_confirmation => "123", :apikey => "ec5e58d004bcbde0b409bd90593cc28f")

Attraction.delete_all
a1 = Attraction.create(:name => "Attraction1")
a2 = Attraction.create(:name => "Attraction2")
a3 = Attraction.create(:name => "Attraction3")

u1.attractions << a1
u1.attractions << a2
u1.attractions << a3