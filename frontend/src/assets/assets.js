import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact from './contact_image.jpg'
import about_image from './about_image.jpg'
import logo from './logo.jpeg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import images from './images.png'
import multi from './multi.jpg'
import interior_texture from './Interior_Texture.jpg'
import download from './download.jpg'
import drilling_machine from './drilling-machine.jpg'
import cleaning_service from './cleaning-service.jpg'
import cleaning from './cleaning.jpg'
import Banner from './Banner.png'
import carpenter from './carpenter.jpg'
import doc1 from './doc1M.jpeg'
import doc2 from './doc2M.jpeg'
import doc3 from './doc3M.jpeg'
import doc4 from './doc4M.jpeg'
import doc5 from './doc5M.jpeg'
import doc6 from './doc6M.jpeg'
import doc7 from './doc7M.jpeg'
import doc8 from './doc1F.jpeg'
import doc9 from './doc2F.jpeg'
import doc10 from './doc3F.jpeg'
import doc11 from './doc4F.jpeg'
import doc12 from './doc5F.jpeg'
import image1 from './1.jpg'
import image2 from './2.jpg'
import image3 from './3.jpg'
import image4 from './4.jpg'
import image5 from './5.jpg'
import image6 from './6.jpg'
import image7 from './7.jpg'
import image9 from './9.jpg'
import wallpaper from './Wallpaper.jpg'
import paints_wall from './paints_wall.jpg'

export const assets = {
    group_profiles,
    drilling_machine,
    download,
    Banner,
    multi,
    wallpaper,
    paints_wall,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact,  
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'Plumber',
        image: image1 
    },
    {
        speciality: 'House Cleaner',
        image: image2 
    },
    {
        speciality: 'Electrician',
        image: image3 
    },
    {
        speciality: 'Painter',
        image: image5 
    },
    {
        speciality: 'Pest Control',
        image: image6 
    },
    {
        speciality: 'Gardener',
        image: image7     
    },
    {
        speciality: 'Cooking',
        image: image9 
    },
    {
        speciality: 'Appliance Repair',
        image: image4 
    },

]


export const workers = [
    {
        _id: 'doc1',
        name: 'Rajesh Kumar',
        image: doc1,
        speciality: 'Plumber',
        experience: '5 Years',
        about: 'Rajesh Kumar is a skilled plumber with expertise in fixing leaks, pipe installations, and drainage systems. He ensures reliable and long-lasting solutions for residential and commercial properties.',
        fees: 500,
        address: {
            line1: 'Sai Chowk, Wakad',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc8',
        name: 'Sunita Devi',
        image: doc5,
        speciality: 'House Cleaner',
        experience: '3 Years',
        about: 'Sunita Devi provides deep cleaning services, ensuring spotless homes with eco-friendly products. She specializes in kitchen and bathroom cleaning, floor polishing, and dust removal.',
        fees: 300,
        address: {
            line1: 'Dange Chowk, Thergaon',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc3',
        name: 'Vikram Singh',
        image: doc3,
        speciality: 'Electrician',
        experience: '7 Years',
        about: 'Vikram Singh is an experienced electrician, specializing in wiring, lighting installations, and electrical repairs. He follows all safety protocols and provides quick, efficient service.',
        fees: 600,
        address: {
            line1: 'Baner Road, Balewadi',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc4',
        name: 'Arjun Das',
        image: doc4,
        speciality: 'Painter',
        experience: '2 Years',
        about: 'Arjun Das is a skilled painter with expertise in interior and exterior painting. He ensures high-quality finishes with durable and eco-friendly paints.',
        fees: 400,
        address: {
            line1: 'Aundh, ITI Road',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc2',
        name: 'Pankaj Choudhary',
        image: doc2,
        speciality: 'Gardener',
        experience: '4 Years',
        about: 'Pankaj Choudhary is a professional gardener specializing in landscape maintenance, lawn care, and plant health management.',
        fees: 350,
        address: {
            line1: 'Sinhagad Road, Vadgaon Budruk',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc6',
        name: 'Satish Thakur',
        image: doc6,
        speciality: 'Pest Control Technician',
        experience: '6 Years',
        about: 'Satish Thakur provides effective pest control solutions, specializing in termite, rodent, and mosquito control using safe and certified chemicals.',
        fees: 550,
        address: {
            line1: 'Kothrud, Paud Road',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc7',
        name: 'Harish Nair',
        image: doc7,
        speciality: 'Appliance Repair Technician',
        experience: '8 Years',
        about: 'Harish Nair is an expert in repairing home appliances like refrigerators, washing machines, and air conditioners. He provides fast and reliable service at affordable rates.',
        fees: 70,
        address: {
            line1: 'Magarpatta City, Hadapsar',
            line2: 'Pune, Maharashtra'
        }
    }
];
