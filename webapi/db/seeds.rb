# encoding: utf-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.delete_all
u1 = User.create(:username => "User1", :email => "email@email.com", :password => "123", :password_confirmation => "123")
u2 = User.create(:username => "User2", :email => "epost@epost.com", :password => "123", :password_confirmation => "123")

au1 = ApiUser.create(:apikey => "ec5e58d004bcbde0b409bd90593cc28f")

Tag.delete_all
t1 = Tag.create(:name => "New York")
t2 = Tag.create(:name => "Stockholm")
t3 = Tag.create(:name => "San Francisco")
t4 = Tag.create(:name => "USA")
t5 = Tag.create(:name => "Sverige")

Attraction.delete_all
a1 = Attraction.create(:address => "Empire State Building", :user_id => u1.id, :latitude => 40.7484405, :longitude => -73.98566439999999)
a2 = Attraction.create(:address => "Globen", :user_id => u1.id, :latitude => 59.2935725, :longitude => 18.0835501)

a3 = Attraction.create(:address => "Golden Gate Bridge", :user_id => u2.id, :latitude =>  37.8199286, :longitude => -122.4782551)
a4 = Attraction.create(:address => "Statue of Liberty", :user_id => u2.id, :latitude => 40.6892494, :longitude => -74.04450039999999)

t1.attractions << a1
t1.attractions << a4
t2.attractions << a2
t3.attractions << a3
t4.attractions << a1
t4.attractions << a3
t4.attractions << a4
t5.attractions << a2
