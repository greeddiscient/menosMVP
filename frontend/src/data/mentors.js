"use strict";

const mentors = [
  {
    'id': 'jefrey-joe',
    'name': 'Jefrey Joe',
    'image': 'jefrey-joe.jpg',
    'cover': 'jefrey-joe-cover.jpg',
    'position':'Managing Partner',
    'company':'Alpha JWC Ventures',
    'background': 'Jefrey was an active angel investor in early-stage technology startups in Asia and the US, including aCommerce (South East Asia\'s leading e-commerce fulfillment company), Shopline (mobile focused DIY e-commerce store based in HK which was invested by Alibaba), and Vantage Sports (the premier analytics service for NBA players, teams, and media). ',
    'education':'Masters in Business Administration - UCLA',
    'story':'',
  },




  {
    'id': 'stephanie-hermawan',
    'name': 'Stephanie Hermawan',
    'image': 'stephanie-hermawan.jpg',
    'cover': 'stephanie-hermawan-cover.png',
    'position':'Founder',
    'company':'Sankalp Forum',
    'background': 'Sankalp Forum, an initiative of Intellecap, aims to influence the global inclusive development discourse through its work with entrepreneurs, impact investors and inclusive businesses in developing markets. Sankalp Forum was initiated in India in 2009 by Intellecap to create a thriving ecosystem for business-led inclusive development. Over the past seven years, Sankalp has built one of the world\'s largest impact enterprise focused platforms that has supported over 900 social enterprises with connections to over 400 investors, mentors, and business support providers. Over 40 social enterprises recognized by Sankalp have gone on to raise more than USD 120 Mn in funding. Sankalp engages Governments, corporations, influential platforms like the G8 and G20, media and civil society to drive a paradigm shift in inclusive development approaches.',
    'education':'UNSW',
    'story':'',
  },
  {
    'id': 'diono-nurjadin',
    'name': 'Diono Nurjadin',
    'image': 'diono-nurjadin.jpg',
    'cover': 'diono-nurjadin-cover.png',
    'position':'President & CEO',
    'company':'Cardig Aero Services',
    'background': 'Diono Nurjadin previously worked as a Director at Peregrine Securities in Singapore and a Vice President at Bankers Trust in Singapore. He also trusted to works as Director of finance at PT. Bimantara Citra Tbk. He holds an MBA degree from Pace University and a bachelors degree from Rochester University. He is also President & CEO at PT Cardig Aero Services Tbk.',
    'education':"Bachelor Degree - Rochester University MBA - Pace University",
    'story':'',
  },
  {
    'id': 'noni-purnomo',
    'name': 'Noni Purnomo',
    'image': 'noni-purnomo.jpg',
    'cover': 'noni-purnomo-cover.jpg',
    'position':'President Director',
    'company':'Blue Bird Group',
    'background': 'Noni Purnomo was groomed as a successor to her father, H. Purnomo Prawiro, president director of this taxi, logistics and property company founded by her grandmother in 1972 with 25 cabs; today it has 26,000.',
    'education':'Industrial Engineering - University of Newcastle Masters in Marketing & Finance - University of San Francisco',
    'story':'',
  },
  {
    'id': 'handry-satriago',
    'name': 'Handry Satriago',
    'image': 'handry-satriago.jpg',
    'cover': 'handry-satriago-cover.jpg',
    'position':'CEO',
    'company':'General Electric Indonesia',
    'background': 'Handry Satriago (born in Riau, Pekanbaru on June 13, 1969) is the CEO of General Electric Indonesia. He joined the company in 1997 as Business Development Manager. Prior to joining GE he worked for several local companies as head of business development.',
    'education':'Bogor Agricultural University (IPB)',
    'story':'',
  },
  {
    'id': 'ananda-siregar',
    'name': 'Ananda Siregar',
    'image': 'ananda-siregar.jpg',
    'cover': 'ananda-siregar-cover.jpg',
    'position':'Founder',
    'company':'Blitz Megaplex',
    'background': 'Ananda Siregar is Founder of Blitz Megaplex, a major movie theatre chain in Indonesia. He is also Founder of the Global Entrepreneurship Program, a non-profit organization that promotes entrepreneurship in Indonesia. Previously, Siregar worked in banking at Citibank and SalomonSmithBarney. He also worked with the Indonesian Bank Restructuring Agency (IBRA). Siregar has a degree in Psychology and Economics from Northwestern University in the United States.',
    'education':'Psychology & Economics - Northwestern University',
    'story':'',
  },
  {
    'id': 'derice-sumantri',
    'name': 'Derice Sumantri',
    'image': 'derice-sumantri.jpg',
    'cover': 'derice-sumantri-cover.jpg',
    'position':'Director of Marketing & Sales',
    'company':'Royal Progress',
    'background': 'Progress Group is a family owned company in real estate township development, healthcare, agriculture, outdoor advertising and petrol industry that began in Wollongong and Sydney Australia in 1978 and expanded into Indonesia in 1982. ',
    'education':'Bachelor of Commerce - University of Sydney',
    'story':'',
  },
  {
    'id': 'anne-sutanto',
    'name': 'Anne Sutanto',
    'image': 'anne-sutanto.jpg',
    'cover': 'anne-sutanto-cover.jpg',
    'position':'Vice President Director',
    'company':'Pan Brothers',
    'background': 'Mrs. Anne Patricia Sutanto has been Vice President Director of PT. Pan Brothers Tbk, since June 22, 2010 and served as its President Commissioner since 2009. Mrs. Sutanto\'s previous experience includes prominent positions in the business development department of Kayu Lapis Group from 1995 to 1996 and the Assistant Finance Director of the Keris Group from 1996 to 1997. She has been a Director of PT. Pan Brothers Tbk, since 1997. She has been President Commissioner at PT Bumi Teknokultura Unggul Tbk since June 2012. She serves as Director of PT. Pancaprima Ekabrothers and PB International BV. She Completed education at University of Southern California, USA, majoring in Chemical Engineering and minor Business Administration in 1992. Mrs. Sutanto holds a Master of Business Administration (MBA) specializing in finance from Loyola Marymount University, Los Angeles, USA in 1994.',
    'education':'Chemical Engineering - University of Southern California MBA - Loyola Marymount University',
    'story':'',
  },
  {
    'id': 'novistiar-rustandi',
    'name': 'Novistiar Rustandi',
    'image': 'novistiar-rustandi.jpg',
    'cover': 'novistiar-rustandi-cover.png',
    'position':'CEO',
    'company':'HarukaEDU',
    'background': 'Mr. Novistiar Rustandi is an entrepreneur with a passion for internet startups and digital businesses. Mr. Rustandi has worked in management roles at Price Waterhouse Coopers in the United States as well as Indonesis. He serves as Director at Founder Institute, Incorporated. He earned an undergraduate accounting degree, as well as dual master’s degrees in business administration and information systems development from George Washington University, and is a graduate of the inaugural semester of the Founder Institute in Silicon Valley.',
    'education':'The George Washington University',
    'story':'',
  },
  {
    'id': 'aldrin-tando',
    'name': 'Aldrin Tando',
    'image': 'aldrin-tando.png',
    'cover': 'aldrin-tando-cover.png',
    'position':'President & CEO',
    'company':'Aldiron Hero Group',
    'background': 'Aldrin Tando is the President and CEO of Aldiron Hero Group, a diversified corporation with businesses in multiple industries such as real estate, mining, agriculture and security. In addition to running the corporation, Aldrin is also an active contributing member of the Young Presidents’ Organisation (YPO) and the Indonesia Chamber of Commerce and Industry (KADIN)',
    'education':'Engineering - University of Washington Masters - UCLA',
    'story':'',
  },









];

export default mentors;

// name company title education background story
