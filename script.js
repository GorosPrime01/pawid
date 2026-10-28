/* ==========================================================================
   PawID — application script
   Vanilla JS only. Data, language, rendering and interactions.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     Storage
     ------------------------------------------------------------------------ */
  var STORAGE = {
    lang: "pawid.lang",
    pets: "pawid.pets"
  };

  function storageGet(key, fallback) {
    try {
      var value = window.localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  }

  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  /* ------------------------------------------------------------------------
     Demo data
     ------------------------------------------------------------------------ */
  function bi(en, zh) {
    return { en: en, zh: zh };
  }

  var DEMO_PETS = [
    {
      id: "ice",
      petId: "PAW-ICE-001",
      kind: "demo",
      category: "dog",
      name: bi("ICE", "ICE"),
      species: bi("Dog", "狗"),
      breed: bi("German Shepherd", "德国牧羊犬"),
      gender: bi("Female", "母"),
      age: bi("6 years old", "6岁"),
      colour: bi("Brown / Tan", "棕黄色"),
      weight: bi("65 kg", "65 公斤"),
      sterilised: bi("Yes", "已绝育"),
      location: bi("West Pymble, NSW", "新南威尔士州 · West Pymble"),
      personality: bi(
        "Friendly, a little shy, and loves playing with balls.",
        "亲人、有一点胆小，也很喜欢玩球。"
      ),
      favouriteLabel: bi("Favourite food", "喜爱的食物"),
      favourites: bi(
        "Beef liver treats and chicken breast.",
        "牛肝小零食和鸡胸肉。"
      ),
      allergies: bi("None known.", "无已知过敏。"),
      medication: bi("None.", "无。"),
      care: bi(
        "ICE loves companionship and feels happiest when people spend time with her.",
        "ICE很喜欢有人陪伴，多陪陪她会让她更有安全感。"
      ),
      lost: bi(
        "Please approach her gently and calmly.",
        "请温柔、慢慢地靠近她，不要吓到她。"
      ),
      owner: bi("Demo owner", "演示主人"),
      phone: "04 1111 1111",
      emergencyPhone: "04 1111 1111",
      photos: [
        {
          src: "images/ice-1-web.jpg",
          alt: bi(
            "ICE, a German Shepherd, standing indoors and looking at the camera",
            "ICE，一只德国牧羊犬，站在室内望向镜头"
          )
        },
        {
          src: "images/ice-2-web.jpg",
          alt: bi(
            "ICE relaxing on the grass in the evening",
            "ICE 傍晚在草地上休息"
          )
        }
      ]
    },
    {
      id: "cream",
      petId: "PAW-CREAM-002",
      kind: "demo",
      category: "dog",
      name: bi("CREAM", "CREAM"),
      species: bi("Dog", "狗"),
      breed: bi("German Shepherd", "德国牧羊犬"),
      gender: bi("Female", "母"),
      age: bi("6 years old", "6岁"),
      colour: bi("Brown and Black", "棕黑色"),
      weight: bi("60 kg", "60 公斤"),
      sterilised: bi("Yes", "已绝育"),
      location: bi("West Pymble, NSW", "新南威尔士州 · West Pymble"),
      personality: bi(
        "Friendly, vocal, playful, and loves balls.",
        "亲人、比较爱叫、喜欢玩，也很喜欢球。"
      ),
      favouriteLabel: bi("Favourite food and toys", "喜爱的食物和玩具"),
      favourites: bi(
        "Chicken breast and squeaky balls.",
        "鸡胸肉和会发出声音的球。"
      ),
      allergies: bi("None known.", "无已知过敏。"),
      medication: bi("None.", "无。"),
      care: bi(
        "CREAM's ears can be sensitive and may be prone to allergies.",
        "CREAM的耳朵比较敏感，容易出现过敏情况。"
      ),
      lost: bi(
        "She may bark at you, but please do not be afraid. Approach her calmly and gently.",
        "她可能会对你叫，但是请不要害怕，请保持冷静并温柔地靠近她。"
      ),
      owner: bi("Demo owner", "演示主人"),
      phone: "04 1111 1111",
      emergencyPhone: "04 1111 1111",
      photos: [
        {
          src: "images/cream-1-web.jpg",
          alt: bi(
            "CREAM, a German Shepherd, resting on the grass with a ball",
            "CREAM，一只德国牧羊犬，趴在草地上，身边有一个球"
          )
        },
        {
          src: "images/cream-2-web.jpg",
          alt: bi(
            "CREAM sitting indoors and looking to the side",
            "CREAM 在室内坐着，望向前方"
          )
        }
      ]
    },
    {
      id: "xiaolu",
      petId: "PAW-XIAOLU-003",
      kind: "demo",
      category: "cat",
      name: bi("Xiao Lu", "小露"),
      species: bi("Cat", "猫"),
      breed: bi("Tabby Cat", "狸花猫"),
      gender: bi("Female", "母"),
      age: bi("3 years old", "3岁"),
      colour: bi(
        "Silver grey tabby with dark stripes",
        "银灰色狸花纹，带深色条纹"
      ),
      weight: bi("10 kg", "10 公斤"),
      sterilised: bi("Yes", "已绝育"),
      location: bi("Padstow, NSW", "新南威尔士州 · Padstow"),
      personality: bi(
        "Calm, slightly aloof, shy, and gentle.",
        "有一点高冷和胆小，但性格温柔。"
      ),
      favouriteLabel: bi("Favourite food", "喜爱的食物"),
      favourites: bi("Egg yolk and prawns.", "鸡蛋黄和虾仁。"),
      allergies: bi("None known.", "无已知过敏。"),
      medication: bi("None.", "无。"),
      care: bi(
        "She needs regular companionship and playtime.",
        "需要经常陪她玩，也需要适当的陪伴。"
      ),
      lost: bi(
        "Please do not scare her. Approach slowly and gently.",
        "请不要吓她，请慢慢地、温柔地靠近她。"
      ),
      owner: bi("Demo owner", "演示主人"),
      phone: "04 2222 2222",
      emergencyPhone: "04 2222 2222",
      photos: [
        {
          src: "images/xiaolu-1-web.jpg",
          alt: bi(
            "Xiao Lu, a silver tabby cat, curled up in a basket",
            "小露，一只银灰色狸花猫，蜷在猫窝里"
          )
        },
        {
          src: "images/xiaolu-2-web.jpg",
          alt: bi(
            "Xiao Lu reaching toward a piece of butter on a table",
            "小露趴在桌边，伸爪够一块黄油"
          )
        }
      ]
    }
  ];

  var SPECIES_OPTIONS = [
    { value: "dog", en: "Dog", zh: "狗", category: "dog" },
    { value: "cat", en: "Cat", zh: "猫", category: "cat" },
    { value: "rabbit", en: "Rabbit", zh: "兔", category: "other" },
    { value: "bird", en: "Bird", zh: "鸟", category: "other" },
    { value: "hamster", en: "Hamster", zh: "仓鼠", category: "other" },
    { value: "reptile", en: "Reptile", zh: "爬行动物", category: "other" },
    { value: "other", en: "Other", zh: "其他", category: "other" }
  ];

  var GENDER_OPTIONS = [
    { value: "female", en: "Female", zh: "母" },
    { value: "male", en: "Male", zh: "公" },
    { value: "unknown", en: "Unknown", zh: "未知" }
  ];

  var STERILISED_OPTIONS = [
    { value: "yes", en: "Yes", zh: "已绝育" },
    { value: "no", en: "No", zh: "未绝育" },
    { value: "unsure", en: "Not sure", zh: "不确定" }
  ];

  /* ------------------------------------------------------------------------
     Translations
     ------------------------------------------------------------------------ */
  var I18N = {
    en: {
      "meta.homeTitle": "PawID — Every Pet Deserves an Identity.",
      "meta.petsTitle": "My Pets · PawID",
      "meta.createTitle": "Create a Pet ID · PawID",
      "meta.description": "PawID is a bilingual English and Simplified Chinese digital pet identity and safety platform for Australian pet owners.",

      "nav.home": "Home",
      "nav.pets": "My Pets",
      "nav.create": "Create Pet ID",
      "nav.how": "How It Works",

      "aria.language": "Language",
      "aria.primary": "Primary navigation",
      "aria.mobile": "Mobile navigation",
      "aria.openMenu": "Open menu",
      "aria.closeMenu": "Close menu",
      "aria.close": "Close",
      "aria.viewPhoto": "View photo",
      "aria.previousPhoto": "Previous photo",
      "aria.nextPhoto": "Next photo",
      "aria.viewProfile": "View profile for",

      "common.viewProfile": "View Profile",
      "common.digitalId": "Digital ID",
      "common.lostMode": "Lost Mode",
      "common.callOwner": "Call Owner",
      "common.idActive": "ID active",
      "common.protected": "Protected",
      "common.notProvided": "Not provided",
      "common.close": "Close",

      "hero.badge": "A digital identity for every pet",
      "hero.titleA": "Every Pet Deserves",
      "hero.titleB": "an Identity.",
      "hero.sub": "Create a digital identity for your pet and make their important information easier to access when it matters most.",
      "hero.primary": "Create a Pet ID",
      "hero.secondary": "Meet Our Pets",
      "hero.note1": "Australian owned",
      "hero.note2": "English + 中文",
      "hero.note3": "Privacy-first",
      "hero.photoAlt": "ICE, a German Shepherd, looking at the camera",
      "hero.idLabel": "Live digital ID",
      "hero.idStatus": "Verified",
      "hero.idBreed": "German Shepherd · 6",
      "hero.tagScan": "Scan me",
      "hero.status": "ID active",
      "aria.skip": "Skip to content",

      "trust.1": "Digital pet identity",
      "trust.2": "QR lost pet tag",
      "trust.3": "Emergency contact",
      "trust.4": "Medical notes",
      "trust.5": "Bilingual by design",

      "how.eyebrow": "How PawID works",
      "how.title": "From profile to a safe way home.",
      "how.lede": "Four simple steps, designed to take minutes — and to be there when it matters.",
      "how.step1.label": "Step 01",
      "how.step1.title": "Create Their Profile",
      "how.step1.text": "Add your pet's photo, breed, personality and care notes — everything a finder or vet might need.",
      "how.step2.label": "Step 02",
      "how.step2.title": "Generate Their Digital ID",
      "how.step2.text": "PawID turns those details into a beautifully designed digital identity card.",
      "how.step3.label": "Step 03",
      "how.step3.title": "Attach Their QR Tag",
      "how.step3.text": "Link a lightweight QR tag to their collar, ready for the day it's needed.",
      "how.step4.label": "Step 04",
      "how.step4.title": "Help Them Get Home",
      "how.step4.text": "A finder scans the tag and sees bilingual emergency details instantly.",

      "benefits.eyebrow": "Why PawID",
      "benefits.title": "Everything they need, in one safe place.",
      "benefits.lede": "A considered set of tools for the moments that matter — simple to use, and reassuring when it counts.",
      "benefit.1.title": "Digital Pet Identity",
      "benefit.1.text": "A polished, always-current profile that travels with your pet.",
      "benefit.2.title": "QR Lost Pet Tag",
      "benefit.2.text": "A simple scan opens the information a finder needs.",
      "benefit.3.title": "Emergency Information",
      "benefit.3.text": "Calm, clear guidance for whoever finds them.",
      "benefit.4.title": "Owner Contact",
      "benefit.4.text": "One tap to reach the person who knows them best.",
      "benefit.5.title": "Medical Notes",
      "benefit.5.text": "Allergies, medication and care notes, ready when needed.",
      "benefit.6.title": "Multiple Pets",
      "benefit.6.text": "Keep every companion organised in one place.",
      "benefit.7.title": "Bilingual Emergency Information",
      "benefit.7.text": "English and Chinese, shown together — no switching required.",

      "featured.eyebrow": "Featured pets",
      "featured.title": "Meet the friends behind PawID.",
      "featured.lede": "Real profiles, real details. Explore how each pet's identity comes together.",
      "featured.view": "View Profile",

      "tag.eyebrow": "The PawID tag",
      "tag.coming": "Coming soon",
      "tag.title": "A Small Tag. A Safer Journey Home.",
      "tag.body": "Attach a PawID QR tag to your pet's collar. If they ever wander, a finder can scan it to reach their emergency profile — instantly, in English and Chinese, with no app required.",
      "tag.1.title": "No app required",
      "tag.1.text": "A finder just uses the camera on their phone.",
      "tag.2.title": "Bilingual at a glance",
      "tag.2.text": "English and Chinese emergency details appear together.",
      "tag.3.title": "Privacy by design",
      "tag.3.text": "Only the information needed to help them home is shared.",
      "tag.cta": "Join the tag waitlist",
      "tag.tagline": "If found, scan me",
      "tag.tagSub": "Protected",
      "tag.float1": "Works with any phone",
      "tag.float2": "No app needed",

      "privacy.eyebrow": "Privacy promise",
      "privacy.title": "Public safety information. Never private details.",
      "privacy.lede": "PawID is designed to help a finder get your pet home without ever exposing information that could put your family at risk.",
      "privacy.1.title": "Public profile",
      "privacy.1.text": "Name, photo, breed and safe contact details.",
      "privacy.2.title": "Kept private",
      "privacy.2.text": "Home address, microchip number and private documents.",
      "privacy.3.title": "You stay in control",
      "privacy.3.text": "Choose what a finder sees, and update it any time.",

      "cta.eyebrow": "Start today",
      "cta.title": "Give your pet the identity they deserve.",
      "cta.body": "Create a free digital profile in a few minutes — no app, no fuss.",
      "cta.primary": "Create a Pet ID",
      "cta.secondary": "Explore My Pets",
      "cta.note": "Demo profiles are ready to explore.",

      "footer.tagline": "A bilingual digital identity for the pets we love.",
      "footer.taglineShort": "Pet safety, in two languages.",
      "footer.product": "Product",
      "footer.safety": "Safety",
      "footer.about": "PawID",
      "footer.lostGuide": "Lost Mode guide",
      "footer.qrTag": "The QR tag",
      "footer.privacy": "Privacy promise",
      "footer.approach": "Our approach",
      "footer.contact": "Contact",
      "footer.location": "Sydney, Australia",
      "footer.note": "PawID is a design prototype. All phone numbers shown are fictional demonstration numbers.",
      "footer.rights": "© 2026 PawID. All rights reserved.",

      "pets.eyebrow": "Pet dashboard",
      "pets.title": "My Pets",
      "pets.lede": "Manage profiles, open digital IDs and switch on Lost Mode when it matters.",
      "pets.add": "Add a pet",
      "pets.stat1": "Pets protected",
      "pets.stat2": "Digital IDs ready",
      "pets.stat3": "Safety information",
      "pets.stat3Value": "Bilingual",
      "pets.filterAll": "All pets",
      "pets.filterDogs": "Dogs",
      "pets.filterCats": "Cats",
      "pets.filterOther": "Other",
      "pets.countOne": "{n} pet",
      "pets.countMany": "{n} pets",
      "pets.addCardTitle": "Add another companion",
      "pets.addCardBody": "Create a new PawID in a few minutes.",
      "pets.empty": "No pets in this category yet.",
      "pets.cardBreed": "Breed",
      "pets.cardGender": "Gender",
      "pets.cardAge": "Age",
      "pets.cardLocation": "Location",
      "pets.cardSpecies": "Species",

      "pet.eyebrow": "Digital pet passport",
      "pet.back": "Back to My Pets",
      "pet.active": "ID active",
      "pet.idLabel": "PawID number",
      "pet.identityTitle": "Identity",
      "pet.personalityTitle": "Personality",
      "pet.healthTitle": "Health & care",
      "pet.allergies": "Allergies",
      "pet.medication": "Medication",
      "pet.care": "Care notes",
      "pet.emergencyTitle": "Emergency information",
      "pet.owner": "Owner",
      "pet.emergencyContact": "Emergency contact",
      "pet.lostInstructions": "Lost pet instructions",
      "pet.demoNote": "Demo profile · Phone numbers are fictional demonstration numbers.",
      "pet.digitalIdTitle": "Digital ID card",
      "pet.digitalIdBody": "A printable identity card with a unique PawID number and QR code.",
      "pet.openId": "Open Digital ID",
      "pet.print": "Print / Save as PDF",
      "pet.callOwner": "Call Owner",
      "pet.lostMode": "Lost Mode",
      "pet.digitalId": "Digital ID",
      "pet.photoMain": "Portrait",
      "pet.photoLifestyle": "Lifestyle",
      "pet.viewPhoto": "View photo",
      "pet.privacyTitle": "What a finder can see",
      "pet.publicInfo": "Public rescue information",
      "pet.publicDesc": "Name, photo, breed, location, lost instructions and a contact number.",
      "pet.privateInfo": "Kept private",
      "pet.privateDesc": "Home address, microchip number and personal documents are never shown.",
      "pet.notFoundTitle": "We couldn't find that pet.",
      "pet.notFoundBody": "The profile may have been removed, or the link may be incorrect.",
      "pet.notFoundCta": "Go to My Pets",
      "pet.photoCount": "Photo {n} of {total}",
      "pet.ownerPrimary": "Primary contact",
      "pet.backup": "Backup number",
      "pet.species": "Species",
      "pet.breed": "Breed",
      "pet.age": "Age",
      "pet.gender": "Gender",
      "pet.colour": "Colour",
      "pet.weight": "Weight",
      "pet.sterilised": "Sterilised",
      "pet.location": "Location",
      "pet.pawidShort": "PawID",
      "pet.rescueNote": "Only safety information is visible on this page.",
      "pet.photoLabel": "Photo",

      "id.modalTitle": "Digital pet ID",
      "id.modalDesc": "Show this card or save it for printing.",
      "id.cardType": "Pet identity card",
      "id.name": "Name",
      "id.breed": "Breed",
      "id.age": "Age",
      "id.sex": "Sex",
      "id.location": "Location",
      "id.number": "PawID no.",
      "id.foot": "If found, please contact the owner.",
      "id.print": "Print card",
      "id.close": "Close",
      "id.cardAria": "Digital identity card for",

      "create.eyebrow": "Create a Pet ID",
      "create.title": "Start their identity.",
      "create.lede": "A few details now can make all the difference later. Everything can be updated whenever you need.",
      "create.previewLabel": "Live preview",
      "create.previewDraft": "Draft",
      "create.previewNote": "This is how their digital identity will look.",
      "create.previewCaption": "Preview only — your pet's full card is generated after saving.",
      "create.previewName": "Your pet's name",
      "create.previewAnimal": "Animal type",
      "create.previewBreed": "Breed",
      "create.previewLocation": "Your suburb",
      "create.section1Title": "About your pet",
      "create.section1Desc": "The essentials that make them who they are.",
      "create.section2Title": "Health & care",
      "create.section2Desc": "Everyday details that help others care for them.",
      "create.section3Title": "Owner & emergency contact",
      "create.section3Desc": "Who to call if your pet is ever found.",
      "create.section4Title": "Pet photo",
      "create.section4Desc": "A clear, friendly photo helps a finder recognise them instantly.",
      "create.required": "* Required fields",
      "create.privacyNote": "Only safety information is shown on the public profile.",
      "create.submit": "Create Pet ID",
      "create.cancel": "Cancel",
      "create.successEyebrow": "Profile created",
      "create.successTitle": "Their PawID is ready.",
      "create.successCopy": "You can now view the profile, open the digital ID or switch on Lost Mode.",
      "create.successLocal": "Saved on this device.",
      "create.successView": "View pet profile",
      "create.successPets": "Go to My Pets",
      "create.successAnother": "Create another",

      "form.name": "Pet Name",
      "form.namePlaceholder": "e.g. ICE",
      "form.animalType": "Animal Type",
      "form.choose": "Choose an animal type",
      "form.breed": "Breed",
      "form.breedPlaceholder": "e.g. German Shepherd",
      "form.gender": "Gender",
      "form.genderFemale": "Female",
      "form.genderMale": "Male",
      "form.genderUnknown": "Unknown",
      "form.birthday": "Birthday / Age",
      "form.birthdayPlaceholder": "e.g. 14 Mar 2021 or 4 years",
      "form.colour": "Colour",
      "form.colourPlaceholder": "e.g. Brown / Tan",
      "form.weight": "Weight",
      "form.weightPlaceholder": "e.g. 12 kg",
      "form.sterilised": "Sterilised",
      "form.sterYes": "Yes",
      "form.sterNo": "No",
      "form.sterUnsure": "Not sure",
      "form.personality": "Personality",
      "form.personalityPlaceholder": "How would you describe them?",
      "form.favFood": "Favourite Food",
      "form.favFoodPlaceholder": "e.g. Chicken breast",
      "form.favToy": "Favourite Toy",
      "form.favToyPlaceholder": "e.g. Squeaky ball",
      "form.allergies": "Allergies",
      "form.allergiesPlaceholder": "e.g. None known",
      "form.medication": "Medication",
      "form.medicationPlaceholder": "e.g. None",
      "form.care": "Care Notes",
      "form.carePlaceholder": "Anything a carer should know?",
      "form.lost": "Lost Pet Instructions",
      "form.lostPlaceholder": "How should someone approach your pet if they are lost?",
      "form.ownerName": "Owner Name",
      "form.ownerNamePlaceholder": "e.g. Alex Chen",
      "form.ownerPhone": "Owner Phone",
      "form.phonePlaceholder": "e.g. 04 1234 5678",
      "form.emergency": "Emergency Contact",
      "form.emergencyPlaceholder": "A second number if available",
      "form.suburb": "Suburb",
      "form.suburbPlaceholder": "e.g. Chatswood, NSW",
      "form.photo": "Pet Photo",
      "form.photoCta": "Choose a photo",
      "form.photoHint": "JPG or PNG · Optional · Max 12 MB",
      "form.photoReady": "Ready to save",
      "form.removePhoto": "Remove photo",
      "form.changePhoto": "Change photo",

      "species.dog": "Dog",
      "species.cat": "Cat",
      "species.rabbit": "Rabbit",
      "species.bird": "Bird",
      "species.hamster": "Hamster",
      "species.reptile": "Reptile",
      "species.other": "Other",

      "errors.name": "Please enter your pet's name.",
      "errors.type": "Please choose an animal type.",
      "errors.phone": "Please enter a contact number.",
      "errors.phoneInvalid": "Please enter a valid Australian phone number.",
      "errors.photo": "That file could not be read. Please choose a JPG or PNG.",

      "toast.created": "PawID created successfully.",
      "toast.waitlist": "You're on the tag waitlist. We'll be in touch.",
      "toast.saveError": "We couldn't save this pet. Try a smaller photo.",
      "toast.photo": "Photo added.",
      "toast.lightboxHint": "Use the arrow keys to browse photos."
    },

    zh: {
      "meta.homeTitle": "PawID — 每只宠物都值得拥有自己的身份。",
      "meta.petsTitle": "我的宠物 · PawID",
      "meta.createTitle": "创建宠物身份 · PawID",
      "meta.description": "PawID 是面向澳大利亚宠物主人的中英双语宠物数字身份与安全平台。",

      "nav.home": "首页",
      "nav.pets": "我的宠物",
      "nav.create": "创建宠物身份",
      "nav.how": "如何运作",

      "aria.language": "语言",
      "aria.primary": "主导航",
      "aria.mobile": "移动端导航",
      "aria.openMenu": "打开菜单",
      "aria.closeMenu": "关闭菜单",
      "aria.close": "关闭",
      "aria.viewPhoto": "查看照片",
      "aria.previousPhoto": "上一张照片",
      "aria.nextPhoto": "下一张照片",
      "aria.viewProfile": "查看档案：",

      "common.viewProfile": "查看档案",
      "common.digitalId": "数字身份",
      "common.lostMode": "走失模式",
      "common.callOwner": "联系主人",
      "common.idActive": "身份有效",
      "common.protected": "已守护",
      "common.notProvided": "未填写",
      "common.close": "关闭",

      "hero.badge": "为每只宠物打造数字身份",
      "hero.titleA": "每只宠物都值得拥有",
      "hero.titleB": "自己的身份。",
      "hero.sub": "为你的宠物创建专属数字身份，在重要时刻让关键信息更容易被找到。",
      "hero.primary": "创建宠物身份",
      "hero.secondary": "认识我们的宠物",
      "hero.note1": "澳洲本地打造",
      "hero.note2": "中英双语",
      "hero.note3": "隐私优先",
      "hero.photoAlt": "ICE，一只德国牧羊犬，正望向镜头",
      "hero.idLabel": "数字身份预览",
      "hero.idStatus": "已验证",
      "hero.idBreed": "德国牧羊犬 · 6岁",
      "hero.tagScan": "扫码",
      "hero.status": "身份有效",
      "aria.skip": "跳到主要内容",

      "trust.1": "宠物数字身份",
      "trust.2": "二维码寻宠挂牌",
      "trust.3": "紧急联系方式",
      "trust.4": "医疗照护备注",
      "trust.5": "原生双语设计",

      "how.eyebrow": "PawID 如何运作",
      "how.title": "从一份档案，到一条安全的回家路。",
      "how.lede": "四个简单步骤，几分钟即可完成，只为在关键时刻派上用场。",
      "how.step1.label": "第 01 步",
      "how.step1.title": "创建宠物档案",
      "how.step1.text": "添加照片、品种、性格与照护备注，让拾获者或兽医第一时间了解爱宠。",
      "how.step2.label": "第 02 步",
      "how.step2.title": "生成数字身份",
      "how.step2.text": "PawID 将资料整理成一张设计精美的数字身份卡。",
      "how.step3.label": "第 03 步",
      "how.step3.title": "佩戴二维码挂牌",
      "how.step3.text": "将轻巧的二维码挂牌挂在颈圈上，为需要的那一天做好准备。",
      "how.step4.label": "第 04 步",
      "how.step4.title": "帮助宠物回家",
      "how.step4.text": "拾获者扫码后，即可立即看到中英双语紧急信息。",

      "benefits.eyebrow": "为什么选择 PawID",
      "benefits.title": "重要信息，都在一个安全的地方。",
      "benefits.lede": "为关键时刻精心打造的一组功能，简单易用，在需要时带来安心。",
      "benefit.1.title": "数字宠物身份",
      "benefit.1.text": "一份精致、随时更新的宠物档案，始终与爱宠相伴。",
      "benefit.2.title": "二维码寻宠挂牌",
      "benefit.2.text": "轻轻一扫，即可打开拾获者所需的信息。",
      "benefit.3.title": "紧急信息",
      "benefit.3.text": "为拾获者提供清晰、安心的指引。",
      "benefit.4.title": "主人联系方式",
      "benefit.4.text": "一键联系最了解爱宠的人。",
      "benefit.5.title": "医疗与照护备注",
      "benefit.5.text": "过敏、用药与照护备注，需要时随时可查。",
      "benefit.6.title": "多宠物管理",
      "benefit.6.text": "在一个地方管理所有爱宠。",
      "benefit.7.title": "中英双语紧急信息",
      "benefit.7.text": "中英文同时呈现，无需切换。",

      "featured.eyebrow": "特色宠物",
      "featured.title": "认识 PawID 身后的朋友们。",
      "featured.lede": "真实档案，真实信息。看看每只爱宠的身份是如何呈现的。",
      "featured.view": "查看档案",

      "tag.eyebrow": "PawID 实体挂牌",
      "tag.coming": "即将推出",
      "tag.title": "小小挂牌，更安心的回家路。",
      "tag.body": "将 PawID 二维码挂牌挂在爱宠的颈圈上。如果它不慎走失，拾获者只需扫码，即可立即查看中英双语紧急档案，无需下载应用。",
      "tag.1.title": "无需下载应用",
      "tag.1.text": "拾获者用手机相机即可扫描。",
      "tag.2.title": "双语一目了然",
      "tag.2.text": "中英文紧急信息同时呈现。",
      "tag.3.title": "隐私优先设计",
      "tag.3.text": "仅分享帮助爱宠回家所需的信息。",
      "tag.cta": "加入挂牌等候名单",
      "tag.tagline": "若发现我，请扫码",
      "tag.tagSub": "已守护",
      "tag.float1": "支持任何手机",
      "tag.float2": "无需下载应用",

      "privacy.eyebrow": "隐私承诺",
      "privacy.title": "只公开安全信息，绝不公开私人资料。",
      "privacy.lede": "PawID 旨在帮助拾获者送爱宠回家，同时绝不暴露可能危及家庭隐私的信息。",
      "privacy.1.title": "公开档案",
      "privacy.1.text": "名字、照片、品种与安全的联系方式。",
      "privacy.2.title": "私人信息",
      "privacy.2.text": "住址、芯片号码与私人证件信息。",
      "privacy.3.title": "由你掌控",
      "privacy.3.text": "自由设置拾获者可见的内容，并可随时更新。",

      "cta.eyebrow": "即刻开始",
      "cta.title": "给爱宠一个专属身份。",
      "cta.body": "几分钟即可创建免费数字档案，无需下载应用，简单省心。",
      "cta.primary": "创建宠物身份",
      "cta.secondary": "浏览我的宠物",
      "cta.note": "演示档案已准备好，欢迎浏览。",

      "footer.tagline": "为我们珍爱的宠物，打造中英双语数字身份。",
      "footer.taglineShort": "双语守护，安心相伴。",
      "footer.product": "产品",
      "footer.safety": "安全",
      "footer.about": "关于 PawID",
      "footer.lostGuide": "走失模式指引",
      "footer.qrTag": "二维码挂牌",
      "footer.privacy": "隐私承诺",
      "footer.approach": "我们的理念",
      "footer.contact": "联系我们",
      "footer.location": "澳大利亚 · 悉尼",
      "footer.note": "PawID 为设计演示原型，页面中所有电话号码均为虚构演示号码。",
      "footer.rights": "© 2026 PawID. 保留所有权利。",

      "pets.eyebrow": "宠物管理",
      "pets.title": "我的宠物",
      "pets.lede": "管理爱宠档案、查看数字身份，并在需要时开启走失模式。",
      "pets.add": "添加宠物",
      "pets.stat1": "已守护宠物",
      "pets.stat2": "数字身份已生成",
      "pets.stat3": "安全信息",
      "pets.stat3Value": "双语",
      "pets.filterAll": "全部宠物",
      "pets.filterDogs": "狗狗",
      "pets.filterCats": "猫咪",
      "pets.filterOther": "其他",
      "pets.countOne": "{n} 只宠物",
      "pets.countMany": "{n} 只宠物",
      "pets.addCardTitle": "添加另一只爱宠",
      "pets.addCardBody": "几分钟即可创建新的 PawID 档案。",
      "pets.empty": "这个分类下还没有宠物。",
      "pets.cardBreed": "品种",
      "pets.cardGender": "性别",
      "pets.cardAge": "年龄",
      "pets.cardLocation": "所在区域",
      "pets.cardSpecies": "种类",

      "pet.eyebrow": "数字宠物护照",
      "pet.back": "返回我的宠物",
      "pet.active": "身份有效",
      "pet.idLabel": "PawID 编号",
      "pet.identityTitle": "身份信息",
      "pet.personalityTitle": "性格",
      "pet.healthTitle": "健康与照护",
      "pet.allergies": "过敏情况",
      "pet.medication": "用药情况",
      "pet.care": "照护备注",
      "pet.emergencyTitle": "紧急信息",
      "pet.owner": "主人",
      "pet.emergencyContact": "紧急联系人",
      "pet.lostInstructions": "走失指引",
      "pet.demoNote": "演示档案 · 电话号码均为虚构演示号码。",
      "pet.digitalIdTitle": "数字身份卡",
      "pet.digitalIdBody": "可打印的身份卡，包含专属 PawID 编号与二维码。",
      "pet.openId": "打开数字身份卡",
      "pet.print": "打印 / 保存为 PDF",
      "pet.callOwner": "联系主人",
      "pet.lostMode": "走失模式",
      "pet.digitalId": "数字身份",
      "pet.photoMain": "主照片",
      "pet.photoLifestyle": "生活照",
      "pet.viewPhoto": "查看照片",
      "pet.privacyTitle": "拾获者可以看到什么",
      "pet.publicInfo": "公开的救助信息",
      "pet.publicDesc": "名字、照片、品种、所在区域、走失指引与联系电话。",
      "pet.privateInfo": "保留为私人信息",
      "pet.privateDesc": "住址、芯片号码与个人证件信息不会对外显示。",
      "pet.notFoundTitle": "没有找到这只宠物。",
      "pet.notFoundBody": "档案可能已被删除，或者链接有误。",
      "pet.notFoundCta": "前往我的宠物",
      "pet.photoCount": "第 {n} 张，共 {total} 张",
      "pet.ownerPrimary": "主要联系人",
      "pet.backup": "备用号码",
      "pet.species": "种类",
      "pet.breed": "品种",
      "pet.age": "年龄",
      "pet.gender": "性别",
      "pet.colour": "毛色",
      "pet.weight": "体重",
      "pet.sterilised": "绝育情况",
      "pet.location": "所在区域",
      "pet.pawidShort": "PawID",
      "pet.rescueNote": "此页面仅显示安全相关信息。",
      "pet.photoLabel": "照片",

      "id.modalTitle": "数字宠物身份",
      "id.modalDesc": "可展示此卡，或保存后打印。",
      "id.cardType": "宠物身份卡",
      "id.name": "姓名",
      "id.breed": "品种",
      "id.age": "年龄",
      "id.sex": "性别",
      "id.location": "位置",
      "id.number": "PawID 编号",
      "id.foot": "如发现走失宠物，请联系主人。",
      "id.print": "打印身份卡",
      "id.close": "关闭",
      "id.cardAria": "数字身份卡：",

      "create.eyebrow": "创建宠物身份",
      "create.title": "为爱宠建立专属身份。",
      "create.lede": "现在花几分钟填写资料，关键时刻可能很重要。之后可随时修改。",
      "create.previewLabel": "实时预览",
      "create.previewDraft": "草稿",
      "create.previewNote": "爱宠的数字身份将以此形式呈现。",
      "create.previewCaption": "仅作预览，完整身份卡将在保存后生成。",
      "create.previewName": "宠物名字",
      "create.previewAnimal": "动物类型",
      "create.previewBreed": "品种",
      "create.previewLocation": "所在区域",
      "create.section1Title": "宠物信息",
      "create.section1Desc": "帮助识别爱宠的基本信息。",
      "create.section2Title": "健康与照护",
      "create.section2Desc": "帮助他人了解与照顾爱宠的日常信息。",
      "create.section3Title": "主人与紧急联系人",
      "create.section3Desc": "爱宠被找到时，可以联系的人。",
      "create.section4Title": "宠物照片",
      "create.section4Desc": "一张清晰亲切的照片，能帮助拾获者立即认出爱宠。",
      "create.required": "* 为必填项",
      "create.privacyNote": "公开档案仅显示安全相关信息。",
      "create.submit": "创建宠物身份",
      "create.cancel": "取消",
      "create.successEyebrow": "档案已创建",
      "create.successTitle": "爱宠的 PawID 已创建。",
      "create.successCopy": "现在可以查看档案、打开数字身份卡，或开启走失模式。",
      "create.successLocal": "已保存在本设备。",
      "create.successView": "查看宠物档案",
      "create.successPets": "前往我的宠物",
      "create.successAnother": "再创建一个",

      "form.name": "宠物名字",
      "form.namePlaceholder": "例如：ICE",
      "form.animalType": "动物类型",
      "form.choose": "请选择动物类型",
      "form.breed": "品种",
      "form.breedPlaceholder": "例如：德国牧羊犬",
      "form.gender": "性别",
      "form.genderFemale": "母",
      "form.genderMale": "公",
      "form.genderUnknown": "未知",
      "form.birthday": "生日 / 年龄",
      "form.birthdayPlaceholder": "例如：2021年3月14日 或 4岁",
      "form.colour": "毛色",
      "form.colourPlaceholder": "例如：棕黄色",
      "form.weight": "体重",
      "form.weightPlaceholder": "例如：12 公斤",
      "form.sterilised": "绝育情况",
      "form.sterYes": "已绝育",
      "form.sterNo": "未绝育",
      "form.sterUnsure": "不确定",
      "form.personality": "性格",
      "form.personalityPlaceholder": "用几句话描述爱宠的性格。",
      "form.favFood": "喜爱的食物",
      "form.favFoodPlaceholder": "例如：鸡胸肉",
      "form.favToy": "喜爱的玩具",
      "form.favToyPlaceholder": "例如：会响的球",
      "form.allergies": "过敏情况",
      "form.allergiesPlaceholder": "例如：无已知过敏",
      "form.medication": "用药情况",
      "form.medicationPlaceholder": "例如：无",
      "form.care": "照护备注",
      "form.carePlaceholder": "照顾爱宠时需要留意的事项。",
      "form.lost": "走失指引",
      "form.lostPlaceholder": "如果爱宠走失，拾获者应如何靠近它？",
      "form.ownerName": "主人姓名",
      "form.ownerNamePlaceholder": "例如：陈先生",
      "form.ownerPhone": "主人电话",
      "form.phonePlaceholder": "例如：04 1234 5678",
      "form.emergency": "紧急联系人",
      "form.emergencyPlaceholder": "如有第二个号码，请填写",
      "form.suburb": "所在区域",
      "form.suburbPlaceholder": "例如：Chatswood, NSW",
      "form.photo": "宠物照片",
      "form.photoCta": "选择照片",
      "form.photoHint": "JPG 或 PNG · 可选 · 最大 12 MB",
      "form.photoReady": "准备保存",
      "form.removePhoto": "移除照片",
      "form.changePhoto": "更换照片",

      "species.dog": "狗",
      "species.cat": "猫",
      "species.rabbit": "兔",
      "species.bird": "鸟",
      "species.hamster": "仓鼠",
      "species.reptile": "爬行动物",
      "species.other": "其他",

      "errors.name": "请输入宠物名字。",
      "errors.type": "请选择动物类型。",
      "errors.phone": "请输入联系电话。",
      "errors.phoneInvalid": "请输入有效的澳大利亚电话号码。",
      "errors.photo": "无法读取该文件，请选择 JPG 或 PNG 图片。",

      "toast.created": "PawID 创建成功。",
      "toast.waitlist": "你已加入挂牌等候名单，我们会尽快联系你。",
      "toast.saveError": "保存失败，请尝试使用较小的照片。",
      "toast.photo": "照片已添加。",
      "toast.lightboxHint": "可使用方向键浏览照片。"
    }
  };

  /* ------------------------------------------------------------------------
     State
     ------------------------------------------------------------------------ */
  var state = {
    lang: "en",
    filter: "all",
    currentPet: null,
    overlay: null,
    lostOpen: false,
    lastFocus: null,
    observer: null,
    photoData: null,
    lastCreated: null,
    autoOpenedLost: false,
    previewSerial: 4
  };

  /* ------------------------------------------------------------------------
     Inline icon sprite (injected once per page)
     ------------------------------------------------------------------------ */
  var SPRITE_MARKUP =
    '<svg class="icon-sprite" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
    '<symbol id="i-paw" viewBox="0 0 24 24"><ellipse cx="7" cy="8.2" rx="2.2" ry="2.9"/><ellipse cx="12" cy="6.3" rx="2.2" ry="3.1"/><ellipse cx="17" cy="8.2" rx="2.2" ry="2.9"/><path d="M12 10.8c3.3 0 5.6 2.5 5.6 5.1 0 2.3-2 3.5-5.6 3.5s-5.6-1.2-5.6-3.5c0-2.6 2.3-5.1 5.6-5.1Z"/></symbol>' +
    '<symbol id="i-shield-check" viewBox="0 0 24 24"><path d="M12 3 19 6v5.2c0 4.3-2.9 7.4-7 9.8-4.1-2.4-7-5.5-7-9.8V6l7-3Z"/><path d="m8.7 11.8 2.2 2.2 4.4-4.6"/></symbol>' +
    '<symbol id="i-qr" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><path d="M14.5 14.5h2.5v2.5h-2.5zM20.5 14.5v6h-6M14.5 20.5h2.5"/></symbol>' +
    '<symbol id="i-id-card" viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><circle cx="8" cy="11" r="2"/><path d="M5 16c.5-1.6 1.6-2.4 3-2.4s2.5.8 3 2.4M14 10h4M14 13h4M14 16h2.5"/></symbol>' +
    '<symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.5 3.5h3l1.3 4-2 1.3a12.2 12.2 0 0 0 6.4 6.4l1.3-2 4 1.3v3c0 1.4-1.1 2.5-2.5 2.5C11.2 20 4 12.8 4 6c0-1.4 1.1-2.5 2.5-2.5Z"/></symbol>' +
    '<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7-4.2-7-9.2A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7 2.8C19 15.8 12 20 12 20Z"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24"><path d="m4.5 12.5 5 5 10-11"/></symbol>' +
    '<symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></symbol>' +
    '<symbol id="i-arrow-left" viewBox="0 0 24 24"><path d="M20 12H5M11 6l-6 6 6 6"/></symbol>' +
    '<symbol id="i-chevron-right" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></symbol>' +
    '<symbol id="i-chevron-left" viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></symbol>' +
    '<symbol id="i-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>' +
    '<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>' +
    '<symbol id="i-printer" viewBox="0 0 24 24"><path d="M6 9V4h12v5"/><rect x="4" y="9" width="16" height="8" rx="2"/><path d="M7 14h10v6H7z"/></symbol>' +
    '<symbol id="i-alert" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7.5V13M12 16.6h.01"/></symbol>' +
    '<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-6.5-5.7-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.3-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.4"/></symbol>' +
    '<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></symbol>' +
    '<symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.4"/><path d="M5 20c.8-3.6 3.3-5.5 7-5.5s6.2 1.9 7 5.5"/></symbol>' +
    '<symbol id="i-medical" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M8 12h8"/></symbol>' +
    '<symbol id="i-treat" viewBox="0 0 24 24"><path d="M4.5 12.5h15c0 4.2-3.3 7-7.5 7s-7.5-2.8-7.5-7Z"/><path d="M9 9c0-1.3 1.1-2 2.4-2M13.5 9c0-1.3 1.1-2 2.4-2"/></symbol>' +
    '<symbol id="i-lock" viewBox="0 0 24 24"><rect x="4.5" y="10" width="15" height="10.5" rx="2"/><path d="M8 10V7.8a4 4 0 0 1 8 0V10"/></symbol>' +
    '<symbol id="i-camera" viewBox="0 0 24 24"><path d="M4 8.5h3l1.4-2h7.2L17 8.5h3A1.5 1.5 0 0 1 21.5 10v8A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18v-8A1.5 1.5 0 0 1 4 8.5Z"/><circle cx="12" cy="13.5" r="3.3"/></symbol>' +
    '<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.2 2.3 3.4 5.2 3.4 8.5S14.2 18.2 12 20.5M12 3.5C9.8 5.8 8.6 8.7 8.6 12s1.2 6.2 3.4 8.5"/></symbol>' +
    '<symbol id="i-sparkle" viewBox="0 0 24 24"><path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/><path d="m18.5 15.5.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5Z"/></symbol>' +
    '<symbol id="i-eye" viewBox="0 0 24 24"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.6"/></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.8 6.5 8.2 6 8.2-6"/></symbol>' +
    "</svg>";

  function injectSprite() {
    if (document.querySelector(".icon-sprite")) return;
    var holder = document.createElement("div");
    holder.innerHTML = SPRITE_MARKUP;
    document.body.insertBefore(holder.firstElementChild, document.body.firstChild);
  }

  /* ------------------------------------------------------------------------
     Utilities
     ------------------------------------------------------------------------ */
  function t(key, fallback) {
    var dict = I18N[state.lang] || I18N.en;
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    if (Object.prototype.hasOwnProperty.call(I18N.en, key)) return I18N.en[key];
    return fallback !== undefined ? fallback : key;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[ch];
    });
  }

  function icon(name, extraClass) {
    return (
      '<svg class="icon ' +
      (extraClass || "") +
      '" aria-hidden="true"><use href="#i-' +
      name +
      '"></use></svg>'
    );
  }

  function val(field) {
    if (field == null) return "";
    if (typeof field === "string") return field;
    return field[state.lang] || field.en || field.zh || "";
  }

  function rawEn(field) {
    if (field == null) return "";
    if (typeof field === "string") return field;
    return field.en || field.zh || "";
  }

  function rawZh(field) {
    if (field == null) return "";
    if (typeof field === "string") return field;
    return field.zh || field.en || "";
  }

  function display(field) {
    var value = val(field);
    return value && String(value).trim() ? value : t("common.notProvided");
  }

  function telHref(phone) {
    return "tel:" + String(phone || "").replace(/[^\d+]/g, "");
  }

  function firstChar(name) {
    var chars = Array.from(String(name || "").trim());
    return (chars[0] || "?").toUpperCase();
  }

  function format(template, values) {
    return String(template).replace(/\{(\w+)\}/g, function (match, key) {
      return values[key] !== undefined ? values[key] : match;
    });
  }

  function namePair(field) {
    var en = rawEn(field);
    var zh = rawZh(field);
    if (!zh || zh === en) return escapeHtml(en);
    return escapeHtml(en) + " / " + escapeHtml(zh);
  }

  function dualValue(field, secondaryClass) {
    var en = rawEn(field);
    var zh = rawZh(field);
    if (!zh || zh === en) return "<span>" + escapeHtml(en) + "</span>";
    return (
      "<span>" +
      escapeHtml(en) +
      '</span><span class="' +
      (secondaryClass || "zh") +
      '">' +
      escapeHtml(zh) +
      "</span>"
    );
  }

  function isStaffordPhone(value) {
    var digits = String(value || "").replace(/[^\d]/g, "");
    return /^0[2-478]\d{8}$/.test(digits) || /^61[2-478]\d{8}$/.test(digits);
  }

  /* ------------------------------------------------------------------------
     Custom pet storage
     ------------------------------------------------------------------------ */
  function normaliseStoredPet(input) {
    if (!input || typeof input !== "object" || !input.id) return null;
    var pet = {
      id: String(input.id),
      petId: String(input.petId || "PAW-PET-000"),
      kind: "custom",
      category: input.category === "dog" || input.category === "cat" ? input.category : "other",
      name: input.name && typeof input.name === "object" ? input.name : bi(String(input.name || "Pet"), String(input.name || "宠物")),
      species: input.species && typeof input.species === "object" ? input.species : bi("Other", "其他"),
      breed: input.breed && typeof input.breed === "object" ? input.breed : bi(String(input.breed || ""), String(input.breed || "")),
      gender: input.gender && typeof input.gender === "object" ? input.gender : bi("Unknown", "未知"),
      age: input.age && typeof input.age === "object" ? input.age : bi(String(input.age || ""), String(input.age || "")),
      colour: input.colour && typeof input.colour === "object" ? input.colour : bi(String(input.colour || ""), String(input.colour || "")),
      weight: input.weight && typeof input.weight === "object" ? input.weight : bi(String(input.weight || ""), String(input.weight || "")),
      sterilised: input.sterilised && typeof input.sterilised === "object" ? input.sterilised : bi("Not sure", "不确定"),
      location: input.location && typeof input.location === "object" ? input.location : bi(String(input.location || ""), String(input.location || "")),
      personality: input.personality && typeof input.personality === "object" ? input.personality : bi(String(input.personality || ""), String(input.personality || "")),
      favouriteLabel: input.favouriteLabel && typeof input.favouriteLabel === "object" ? input.favouriteLabel : bi("Favourite food", "喜爱的食物"),
      favourites: input.favourites && typeof input.favourites === "object" ? input.favourites : bi(String(input.favourites || ""), String(input.favourites || "")),
      allergies: input.allergies && typeof input.allergies === "object" ? input.allergies : bi(String(input.allergies || ""), String(input.allergies || "")),
      medication: input.medication && typeof input.medication === "object" ? input.medication : bi(String(input.medication || ""), String(input.medication || "")),
      care: input.care && typeof input.care === "object" ? input.care : bi(String(input.care || ""), String(input.care || "")),
      lost: input.lost && typeof input.lost === "object" ? input.lost : bi(String(input.lost || ""), String(input.lost || "")),
      owner: input.owner && typeof input.owner === "object" ? input.owner : bi(String(input.owner || ""), String(input.owner || "")),
      phone: String(input.phone || ""),
      emergencyPhone: String(input.emergencyPhone || input.phone || ""),
      photos: []
    };
    if (Array.isArray(input.photos)) {
      pet.photos = input.photos
        .filter(function (photo) {
          return photo && photo.src;
        })
        .slice(0, 2)
        .map(function (photo) {
          return {
            src: photo.src,
            alt: photo.alt && typeof photo.alt === "object" ? photo.alt : bi("Pet photo", "宠物照片")
          };
        });
    }
    return pet;
  }

  function loadCustomPets() {
    var raw = storageGet(STORAGE.pets, "[]");
    try {
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(normaliseStoredPet).filter(Boolean);
    } catch (error) {
      return [];
    }
  }

  function saveCustomPets(pets) {
    return storageSet(STORAGE.pets, JSON.stringify(pets));
  }

  function getAllPets() {
    return DEMO_PETS.concat(loadCustomPets());
  }

  function getPetById(id) {
    if (!id) return null;
    var all = getAllPets();
    for (var i = 0; i < all.length; i += 1) {
      if (all[i].id === id) return all[i];
    }
    return null;
  }

  /* ------------------------------------------------------------------------
     QR placeholder generator (decorative, deterministic)
     ------------------------------------------------------------------------ */
  var QR_PAW_PATH =
    "M12 11.1c3.4 0 5.7 2.5 5.7 5.1 0 2.3-2 3.5-5.7 3.5s-5.7-1.2-5.7-3.5c0-2.6 2.3-5.1 5.7-5.1Zm-5-1.9c1.2 0 2.1 1.4 2.1 3s-.9 3-2.1 3-2.1-1.4-2.1-3 .9-3 2.1-3Zm10 0c1.2 0 2.1 1.4 2.1 3s-.9 3-2.1 3-2.1-1.4-2.1-3 .9-3 2.1-3ZM12 3.2c1.4 0 2.5 1.7 2.5 3.7S13.4 10.6 12 10.6s-2.5-1.7-2.5-3.7S10.6 3.2 12 3.2Z";

  function hashSeed(value) {
    var hash = 2166136261;
    for (var i = 0; i < value.length; i += 1) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function mulberry32(seed) {
    var a = seed;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var value = Math.imul(a ^ (a >>> 15), 1 | a);
      value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function qrSvg(seed) {
    var modules = 25;
    var quiet = 2;
    var total = modules + quiet * 2;
    var random = mulberry32(hashSeed(String(seed)));
    var cells = [];
    var x;
    var y;

    for (y = 0; y < modules; y += 1) {
      cells.push(new Array(modules).fill(0));
    }

    function isFinderZone(cx, cy) {
      return (
        (cx < 8 && cy < 8) ||
        (cx >= modules - 8 && cy < 8) ||
        (cx < 8 && cy >= modules - 8)
      );
    }

    function drawFinder(originX, originY) {
      for (var fy = 0; fy < 7; fy += 1) {
        for (var fx = 0; fx < 7; fx += 1) {
          var on =
            fx === 0 ||
            fx === 6 ||
            fy === 0 ||
            fy === 6 ||
            (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4);
          cells[originY + fy][originX + fx] = on ? 1 : 0;
        }
      }
    }

    drawFinder(0, 0);
    drawFinder(modules - 7, 0);
    drawFinder(0, modules - 7);

    for (y = 0; y < modules; y += 1) {
      for (x = 0; x < modules; x += 1) {
        if (isFinderZone(x, y)) continue;
        if (x === 6 || y === 6) {
          cells[y][x] = (x + y) % 2 === 0 ? 1 : 0;
          continue;
        }
        if (x >= 10 && x <= 14 && y >= 10 && y <= 14) {
          cells[y][x] = 0;
          continue;
        }
        cells[y][x] = random() > 0.53 ? 1 : 0;
      }
    }

    var path = "";
    for (y = 0; y < modules; y += 1) {
      for (x = 0; x < modules; x += 1) {
        if (cells[y][x]) {
          path += "M" + (x + quiet) + " " + (y + quiet) + "h1v1h-1z";
        }
      }
    }

    return (
      '<svg class="qr" viewBox="0 0 ' +
      total +
      " " +
      total +
      '" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" role="img" aria-label="QR code placeholder / 二维码占位图">' +
      '<rect width="' +
      total +
      '" height="' +
      total +
      '" fill="#FFFDF8"/>' +
      '<path d="' +
      path +
      '" fill="#211C18"/>' +
      '<circle cx="14.5" cy="14.5" r="3.1" fill="#FFFDF8"/>' +
      '<path d="' +
      QR_PAW_PATH +
      '" transform="translate(11.4 11.6) scale(0.26)" fill="#211C18"/>' +
      "</svg>"
    );
  }

  function initQrCodes(root) {
    (root || document).querySelectorAll("[data-qr]").forEach(function (el) {
      if (!el.dataset.qrReady) {
        el.innerHTML = qrSvg(el.dataset.qr);
        el.dataset.qrReady = "true";
      }
    });
  }

  /* ------------------------------------------------------------------------
     Static translations
     ------------------------------------------------------------------------ */
  function applyStaticTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = t(el.dataset.i18n);
      if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var value = t(el.dataset.i18nPlaceholder);
      if (value !== undefined) el.setAttribute("placeholder", value);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      var value = t(el.dataset.i18nAriaLabel);
      if (value !== undefined) el.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var value = t(el.dataset.i18nAlt);
      if (value !== undefined) el.setAttribute("alt", value);
    });

    document.querySelectorAll(".lang-btn").forEach(function (button) {
      var active = button.dataset.lang === state.lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function updatePageTitle() {
    var page = document.body.dataset.page;
    var title = "";
    if (page === "home") title = t("meta.homeTitle");
    else if (page === "pets") title = t("meta.petsTitle");
    else if (page === "create") title = t("meta.createTitle");
    else if (page === "pet") {
      if (state.currentPet) {
        title = display(state.currentPet.name) + " · PawID";
      } else {
        title = "PawID · " + t("pet.notFoundTitle");
      }
    }
    if (title) document.title = title;

    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description"));
  }

  function setLanguage(lang) {
    if (lang !== "en" && lang !== "zh") lang = "en";
    state.lang = lang;
    storageSet(STORAGE.lang, lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.documentElement.classList.toggle("lang-zh", lang === "zh");
    applyStaticTranslations();
    updateMenuAria();

    var page = document.body.dataset.page;
    if (page === "home") renderFeatured();
    else if (page === "pets") renderPetsPage();
    else if (page === "pet") renderPetPage();
    else if (page === "create") {
      updatePreview();
      if (state.lastCreated && !document.getElementById("create-success").hidden) {
        renderSuccess(state.lastCreated);
      }
    }

    updatePageTitle();
    initReveal();
  }

  /* ------------------------------------------------------------------------
     Visual helpers
     ------------------------------------------------------------------------ */
  function photoVisual(pet, index, options) {
    options = options || {};
    var photo = pet.photos && pet.photos[index];
    var alt = photo
      ? val(photo.alt) || display(pet.name) + " " + t("pet.photoLabel")
      : display(pet.name) + " " + t("pet.photoLabel");
    if (photo && photo.src) {
      return (
        '<img src="' +
        escapeHtml(photo.src) +
        '" alt="' +
        escapeHtml(alt) +
        '" loading="' +
        (options.eager ? "eager" : "lazy") +
        '" decoding="async">'
      );
    }
    return (
      '<div class="photo-placeholder" role="img" aria-label="' +
      escapeHtml(alt) +
      '"><span>' +
      escapeHtml(firstChar(display(pet.name))) +
      "</span>" +
      icon("paw") +
      "</div>"
    );
  }

  function petHref(pet) {
    return "pet.html?id=" + encodeURIComponent(pet.id);
  }

  /* ------------------------------------------------------------------------
     Cards
     ------------------------------------------------------------------------ */
  function featuredCard(pet) {
    var name = display(pet.name);
    return (
      '<article class="pet-card reveal">' +
      '<a class="pet-card__media" href="' +
      petHref(pet) +
      '" aria-label="' +
      escapeHtml(t("aria.viewProfile") + " " + name) +
      '">' +
      photoVisual(pet, 0) +
      '<span class="pet-card__id">' +
      escapeHtml(pet.petId) +
      "</span>" +
      '<span class="pet-card__species">' +
      escapeHtml(display(pet.species)) +
      "</span>" +
      "</a>" +
      '<div class="pet-card__body">' +
      '<div class="pet-card__name-row"><h3 class="pet-card__name"><a href="' +
      petHref(pet) +
      '">' +
      escapeHtml(name) +
      '</a></h3><span class="pet-card__status"><span class="status-dot"></span>' +
      escapeHtml(t("common.idActive")) +
      "</span></div>" +
      '<p class="pet-card__sub">' +
      escapeHtml(display(pet.species)) +
      " · " +
      escapeHtml(display(pet.breed)) +
      "</p>" +
      '<div class="pet-card__meta">' +
      "<span>" +
      icon("clock") +
      escapeHtml(display(pet.age)) +
      "</span>" +
      "<span>" +
      icon("pin") +
      escapeHtml(display(pet.location)) +
      "</span>" +
      "</div>" +
      '<a class="pet-card__cta" href="' +
      petHref(pet) +
      '"><span>' +
      escapeHtml(t("featured.view")) +
      "</span>" +
      icon("arrow-right") +
      "</a>" +
      "</div>" +
      "</article>"
    );
  }

  function dashCard(pet) {
    var name = display(pet.name);
    return (
      '<article class="dash-card reveal" data-category="' +
      escapeHtml(pet.category) +
      '">' +
      '<a class="dash-card__media" href="' +
      petHref(pet) +
      '" aria-label="' +
      escapeHtml(t("aria.viewProfile") + " " + name) +
      '">' +
      photoVisual(pet, 0) +
      '<span class="pet-card__id">' +
      escapeHtml(pet.petId) +
      "</span>" +
      '<span class="pet-card__species">' +
      escapeHtml(display(pet.species)) +
      "</span>" +
      "</a>" +
      '<div class="dash-card__body">' +
      '<div class="dash-card__name-row"><div><h3 class="dash-card__name"><a href="' +
      petHref(pet) +
      '">' +
      escapeHtml(name) +
      '</a></h3><p class="dash-card__breed">' +
      escapeHtml(display(pet.breed)) +
      '</p></div><span class="dash-card__status"><span class="status-dot"></span>' +
      escapeHtml(t("common.protected")) +
      "</span></div>" +
      '<dl class="dash-card__meta">' +
      "<div><dt>" +
      escapeHtml(t("pets.cardSpecies")) +
      "</dt><dd>" +
      escapeHtml(display(pet.species)) +
      "</dd></div>" +
      "<div><dt>" +
      escapeHtml(t("pets.cardGender")) +
      "</dt><dd>" +
      escapeHtml(display(pet.gender)) +
      "</dd></div>" +
      "<div><dt>" +
      escapeHtml(t("pets.cardAge")) +
      "</dt><dd>" +
      escapeHtml(display(pet.age)) +
      "</dd></div>" +
      "<div><dt>" +
      escapeHtml(t("pets.cardLocation")) +
      "</dt><dd>" +
      escapeHtml(display(pet.location)) +
      "</dd></div>" +
      "</dl>" +
      '<div class="dash-card__actions">' +
      '<a class="btn btn--primary" href="' +
      petHref(pet) +
      '">' +
      icon("id-card") +
      escapeHtml(t("common.viewProfile")) +
      "</a>" +
      '<button class="btn btn--soft" type="button" data-open-id data-pet="' +
      escapeHtml(pet.id) +
      '">' +
      icon("qr") +
      escapeHtml(t("common.digitalId")) +
      "</button>" +
      '<button class="btn btn--soft" type="button" data-lost data-pet="' +
      escapeHtml(pet.id) +
      '">' +
      icon("alert") +
      escapeHtml(t("common.lostMode")) +
      "</button>" +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function addCard() {
    return (
      '<a class="add-card reveal" href="create.html">' +
      '<span class="add-card__icon">' +
      icon("plus") +
      "</span>" +
      "<h3>" +
      escapeHtml(t("pets.addCardTitle")) +
      "</h3><p>" +
      escapeHtml(t("pets.addCardBody")) +
      "</p></a>"
    );
  }

  function renderFeatured() {
    var grid = document.getElementById("featured-grid");
    if (!grid) return;
    grid.innerHTML = DEMO_PETS.map(featuredCard).join("");
    initReveal();
  }

  function renderPetsPage() {
    var grid = document.getElementById("pets-grid");
    if (!grid) return;
    var all = getAllPets();
    var filtered =
      state.filter === "all"
        ? all
        : all.filter(function (pet) {
            return pet.category === state.filter;
          });

    grid.innerHTML =
      (filtered.length
        ? filtered.map(dashCard).join("")
        : '<p class="dashboard-empty">' + escapeHtml(t("pets.empty")) + "</p>") +
      addCard();

    var count = document.getElementById("result-count");
    if (count) {
      count.textContent = format(filtered.length === 1 ? t("pets.countOne") : t("pets.countMany"), {
        n: filtered.length
      });
    }

    var statPets = document.getElementById("stat-pets");
    var statIds = document.getElementById("stat-ids");
    if (statPets) statPets.textContent = String(all.length).padStart(2, "0");
    if (statIds) statIds.textContent = String(all.length).padStart(2, "0");

    document.querySelectorAll(".filter-chip").forEach(function (chip) {
      var active = chip.dataset.filter === state.filter;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", active ? "true" : "false");
    });

    initReveal();
  }

  /* ------------------------------------------------------------------------
     Digital ID card
     ------------------------------------------------------------------------ */
  function idCard(pet) {
    var name = display(pet.name);
    var cardType = t("id.cardType");
    return (
      '<article class="id-card" aria-label="' +
      escapeHtml(t("id.cardAria") + " " + name) +
      '">' +
      '<div class="id-card__pattern" aria-hidden="true"></div>' +
      '<header class="id-card__top">' +
      '<span class="id-card__brand"><span class="id-card__mark">' +
      icon("paw") +
      '</span><span>Paw<span class="accent">ID</span></span></span>' +
      '<span class="id-card__type">' +
      escapeHtml(cardType) +
      "</span>" +
      '<span class="id-card__chip" aria-hidden="true"></span>' +
      "</header>" +
      '<div class="id-card__body">' +
      '<div class="id-card__photo">' +
      photoVisual(pet, 0) +
      "</div>" +
      '<div class="id-card__info">' +
      '<span class="id-card__field-label">' +
      escapeHtml(t("id.name")) +
      "</span>" +
      '<strong class="id-card__name">' +
      escapeHtml(name) +
      "</strong>" +
      '<div class="id-card__row">' +
      '<div><span class="id-card__field-label">' +
      escapeHtml(t("id.breed")) +
      '</span><span class="id-card__value">' +
      escapeHtml(display(pet.breed)) +
      "</span></div>" +
      '<div><span class="id-card__field-label">' +
      escapeHtml(t("id.age")) +
      '</span><span class="id-card__value">' +
      escapeHtml(display(pet.age)) +
      "</span></div>" +
      "</div>" +
      '<div class="id-card__row">' +
      '<div><span class="id-card__field-label">' +
      escapeHtml(t("id.sex")) +
      '</span><span class="id-card__value">' +
      escapeHtml(display(pet.gender)) +
      "</span></div>" +
      '<div><span class="id-card__field-label">' +
      escapeHtml(t("id.location")) +
      '</span><span class="id-card__value">' +
      escapeHtml(display(pet.location)) +
      "</span></div>" +
      "</div>" +
      '<div class="id-card__number"><span class="id-card__field-label">' +
      escapeHtml(t("id.number")) +
      '</span><span class="id-card__value">' +
      escapeHtml(pet.petId) +
      "</span></div>" +
      "</div>" +
      '<div class="id-card__qr">' +
      qrSvg(pet.petId) +
      '<span class="id-card__scan">SCAN IF FOUND<span class="id-card__scan-zh">发现宠物请扫码</span></span>' +
      "</div>" +
      "</div>" +
      '<footer class="id-card__foot">' +
      "<span>" +
      escapeHtml(t("id.foot")) +
      '</span><span class="id-card__foot-line"></span>' +
      icon("paw") +
      "</footer>" +
      "</article>"
    );
  }

  function openIdModal(pet) {
    if (!pet) return;
    closeOverlay(false);
    state.lastFocus = document.activeElement;
    state.overlay = { type: "id", pet: pet };
    var root = document.getElementById("modal-root");
    root.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="id-modal-title">' +
      '<div class="modal__backdrop" data-close-overlay></div>' +
      '<div class="id-modal__inner" role="document">' +
      '<div class="id-modal__head"><div><h2 id="id-modal-title">' +
      escapeHtml(t("id.modalTitle")) +
      "</h2><p>" +
      escapeHtml(t("id.modalDesc")) +
      '</p></div><button class="icon-btn" type="button" data-close-overlay aria-label="' +
      escapeHtml(t("aria.close")) +
      '">' +
      icon("close") +
      "</button></div>" +
      idCard(pet) +
      '<div class="id-modal__actions">' +
      '<button class="btn btn--primary" type="button" data-print>' +
      icon("printer") +
      escapeHtml(t("id.print")) +
      "</button>" +
      '<button class="btn btn--ghost" type="button" data-close-overlay>' +
      escapeHtml(t("id.close")) +
      "</button>" +
      "</div>" +
      "</div></div>";
    document.body.classList.add("modal-open");
    var closeBtn = root.querySelector(".icon-btn");
    if (closeBtn) closeBtn.focus();
  }

  function openLightbox(pet, index) {
    if (!pet || !pet.photos || !pet.photos.length) return;
    if (!state.overlay || state.overlay.type !== "lightbox") {
      state.lastFocus = document.activeElement;
    }
    state.overlay = {
      type: "lightbox",
      pet: pet,
      index: Math.max(0, Math.min(index, pet.photos.length - 1))
    };
    renderLightbox();
    document.body.classList.add("modal-open");
  }

  function renderLightbox() {
    var overlay = state.overlay;
    if (!overlay || overlay.type !== "lightbox") return;
    var pet = overlay.pet;
    var total = pet.photos.length;
    var index = overlay.index;
    var photo = pet.photos[index];
    var alt = val(photo.alt) || display(pet.name) + " " + t("pet.photoLabel");
    var root = document.getElementById("modal-root");
    root.innerHTML =
      '<div class="lightbox" role="dialog" aria-modal="true" aria-label="' +
      escapeHtml(display(pet.name) + " " + t("pet.photoLabel")) +
      '">' +
      '<div class="lightbox__bar"><strong>' +
      escapeHtml(display(pet.name)) +
      "</strong><span>" +
      escapeHtml(format(t("pet.photoCount"), { n: index + 1, total: total })) +
      '</span><button class="icon-btn" type="button" data-close-overlay aria-label="' +
      escapeHtml(t("aria.close")) +
      '">' +
      icon("close") +
      "</button></div>" +
      '<div class="lightbox__stage"><figure class="lightbox__figure">' +
      (total > 1
        ? '<button class="lightbox__nav" type="button" data-lightbox-nav="-1" aria-label="' +
          escapeHtml(t("aria.previousPhoto")) +
          '">' +
          icon("chevron-left") +
          "</button>"
        : "") +
      '<img class="lightbox__img" src="' +
      escapeHtml(photo.src) +
      '" alt="' +
      escapeHtml(alt) +
      '">' +
      (total > 1
        ? '<button class="lightbox__nav" type="button" data-lightbox-nav="1" aria-label="' +
          escapeHtml(t("aria.nextPhoto")) +
          '">' +
          icon("chevron-right") +
          "</button>"
        : "") +
      "</figure></div>" +
      '<p class="lightbox__caption">' +
      escapeHtml(t("toast.lightboxHint")) +
      "</p>" +
      "</div>";
    var closeBtn = root.querySelector(".icon-btn");
    if (closeBtn) closeBtn.focus();
  }

  function closeOverlay(restoreFocus) {
    var root = document.getElementById("modal-root");
    if (root) root.innerHTML = "";
    state.overlay = null;
    if (!state.lostOpen) document.body.classList.remove("modal-open");
    if (restoreFocus !== false && state.lastFocus && typeof state.lastFocus.focus === "function") {
      state.lastFocus.focus();
    }
    state.lastFocus = null;
  }

  /* ------------------------------------------------------------------------
     Lost Mode
     ------------------------------------------------------------------------ */
  function bilingualLine(field, className) {
    var en = rawEn(field);
    var zh = rawZh(field);
    if (!en) en = t("common.notProvided");
    if (!zh) zh = "未填写";
    if (en === zh) {
      return '<p class="' + className + '">' + escapeHtml(en) + "</p>";
    }
    return (
      '<p class="' +
      className +
      '">' +
      escapeHtml(en) +
      '</p><p class="' +
      className +
      ' ' +
      className +
      '--zh">' +
      escapeHtml(zh) +
      "</p>"
    );
  }

  function lostMedicalValue(field) {
    var en = rawEn(field) || "Not provided";
    var zh = rawZh(field) || "未填写";
    if (en === zh) return '<dd>' + escapeHtml(en) + "</dd>";
    return '<dd><span>' + escapeHtml(en) + '</span><span class="zh">' + escapeHtml(zh) + "</span></dd>";
  }

  function openLostMode(pet) {
    if (!pet) return;
    closeOverlay(false);
    state.lastFocus = document.activeElement;
    state.lostOpen = true;

    var name = namePair(pet.name);
    var lostEn = rawEn(pet.lost);
    var lostZh = rawZh(pet.lost);
    var lostHtml;
    if (lostEn && lostZh && lostEn !== lostZh) {
      lostHtml =
        '<p class="lost-instruction__en">' +
        escapeHtml(lostEn) +
        '</p><p class="lost-instruction__zh">' +
        escapeHtml(lostZh) +
        "</p>";
    } else {
      lostHtml = '<p class="lost-instruction__en">' + escapeHtml(lostEn || lostZh || "Please approach gently and calmly. / 请温柔、慢慢地靠近我。") + "</p>";
    }

    var locationEn = rawEn(pet.location) || "Not provided";
    var locationZh = rawZh(pet.location) || "未填写";
    var locationHtml =
      escapeHtml(locationEn) +
      (locationZh !== locationEn
        ? '<span class="lost-info__zh">' + escapeHtml(locationZh) + "</span>"
        : "");

    var allergiesEn = rawEn(pet.allergies) || "Not provided";
    var allergiesZh = rawZh(pet.allergies) || "未填写";
    var medicationEn = rawEn(pet.medication) || "Not provided";
    var medicationZh = rawZh(pet.medication) || "未填写";
    var careEn = rawEn(pet.care) || "Not provided";
    var careZh = rawZh(pet.care) || "未填写";
    var ownerEn = rawEn(pet.owner) || "Owner";
    var ownerZh = rawZh(pet.owner) || "主人";

    var root = document.getElementById("lost-root");
    root.hidden = false;
    root.innerHTML =
      '<div class="lost-mode" role="dialog" aria-modal="true" aria-label="Lost pet information / 走失宠物信息">' +
      '<div class="lost-topbar"><div class="container lost-topbar__inner">' +
      '<a class="brand brand--footer" href="index.html" aria-label="PawID">' +
      '<span class="brand-mark">' +
      icon("paw") +
      '</span><span class="brand-word">Paw<span class="brand-word__accent">ID</span></span></a>' +
      '<span class="lost-topbar__label">Lost pet · 走失宠物</span>' +
      '<button class="lost-close" type="button" data-close-lost aria-label="Exit Lost Mode / 退出走失模式">' +
      icon("close") +
      "<span>Exit · 退出</span></button>" +
      "</div></div>" +
      '<section class="lost-hero"><div class="container lost-hero__inner">' +
      '<div class="lost-hero__copy">' +
      '<span class="lost-kicker">Lost pet · 走失宠物</span>' +
      '<h1 class="lost-title">I\'M LOST<span class="lost-title__zh">我走丢了</span></h1>' +
      '<p class="lost-pet-name">' +
      name +
      "<span>" +
      escapeHtml(pet.petId) +
      "</span></p>" +
      '<p class="lost-lead"><span>Please contact my owner.</span><span class="zh">请联系我的主人。</span></p>' +
      "</div>" +
      '<div class="lost-photo"><div class="lost-photo__inner">' +
      photoVisual(pet, 0, { eager: true }) +
      '</div><span class="lost-photo__tag"><span class="status-dot"></span>Lost · 走失</span></div>' +
      "</div></section>" +
      '<div class="container lost-body">' +
      '<section class="lost-call-card">' +
      '<h2 class="lost-call-card__title">Please contact my owner.<span>请联系我的主人。</span></h2>' +
      '<a class="lost-call" href="' +
      escapeHtml(telHref(pet.phone)) +
      '"><span class="lost-call__icon">' +
      icon("phone") +
      '</span><span class="lost-call__text"><strong>Call Owner</strong><span>联系主人</span></span><span class="lost-call__number">' +
      escapeHtml(pet.phone) +
      "</span></a>" +
      '<p class="lost-call-card__hint">A call is the fastest way to let my owner know where I am. <span>一个电话，就能让主人知道我在哪里。</span></p>' +
      "</section>" +
      '<div class="lost-grid">' +
      '<section class="lost-info"><span class="lost-info__label">' +
      icon("phone") +
      "Emergency contact · 紧急联系人</span>" +
      '<span class="lost-info__value"><a href="' +
      escapeHtml(telHref(pet.emergencyPhone)) +
      '">' +
      escapeHtml(pet.emergencyPhone) +
      '</a><span class="lost-info__zh">' +
      escapeHtml(ownerEn) +
      " / " +
      escapeHtml(ownerZh) +
      "</span></span></section>" +
      '<section class="lost-info"><span class="lost-info__label">' +
      icon("pin") +
      "Location · 所在区域</span>" +
      '<span class="lost-info__value">' +
      locationHtml +
      "</span></section>" +
      "</div>" +
      '<section class="lost-panel lost-panel--instructions">' +
      "<h2>How to help me<span>请这样帮助我</span></h2>" +
      '<div class="lost-instruction">' +
      lostHtml +
      "</div>" +
      '<p class="lost-reassure"><span>If you can, please stay with me until my owner arrives.</span><span class="zh">如果方便，请陪在我身边，直到主人到来。</span></p>' +
      "</section>" +
      '<section class="lost-panel lost-panel--medical">' +
      "<h2>Medical information<span>医疗信息</span></h2>" +
      '<dl class="lost-medical">' +
      "<div><dt>Allergies<span>过敏情况</span></dt>" +
      lostMedicalValue(bi(allergiesEn, allergiesZh)) +
      "</div>" +
      "<div><dt>Medication<span>用药情况</span></dt>" +
      lostMedicalValue(bi(medicationEn, medicationZh)) +
      "</div>" +
      "<div><dt>Care notes<span>照护备注</span></dt>" +
      lostMedicalValue(bi(careEn, careZh)) +
      "</div>" +
      "</dl>" +
      "</section>" +
      '<footer class="lost-thanks"><span class="lost-thanks__icon">' +
      icon("paw") +
      "</span><p><strong>Thank you for helping me get home.</strong><span>谢谢你帮助我回家。</span></p></footer>" +
      '<button class="lost-return" type="button" data-close-lost>' +
      icon("arrow-left") +
      "<span>Return to PawID · 返回 PawID</span></button>" +
      "</div></div>";

    document.body.classList.add("lost-open");
    var closeBtn = root.querySelector("[data-close-lost]");
    if (closeBtn) closeBtn.focus();
  }

  function closeLostMode() {
    var root = document.getElementById("lost-root");
    if (!root) return;
    root.hidden = true;
    root.innerHTML = "";
    state.lostOpen = false;
    document.body.classList.remove("lost-open");
    if (state.lastFocus && typeof state.lastFocus.focus === "function") {
      state.lastFocus.focus();
    }
    state.lastFocus = null;
  }

  /* ------------------------------------------------------------------------
     Pet profile page
     ------------------------------------------------------------------------ */
  function detailItem(label, value, extraClass) {
    return (
      '<div class="detail-grid__item"><dt>' +
      escapeHtml(label) +
      "</dt><dd" +
      (extraClass ? ' class="' + extraClass + '"' : "") +
      ">" +
      escapeHtml(value) +
      "</dd></div>"
    );
  }

  function renderPetPage() {
    var root = document.getElementById("pet-root");
    if (!root) return;
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    var pet = getPetById(id);
    state.currentPet = pet;

    if (!pet) {
      root.innerHTML =
        '<div class="container"><div class="pet-not-found">' +
        '<div class="pet-not-found__icon">' +
        icon("paw") +
        "</div><h1>" +
        escapeHtml(t("pet.notFoundTitle")) +
        "</h1><p>" +
        escapeHtml(t("pet.notFoundBody")) +
        '</p><a class="btn btn--primary" href="pets.html">' +
        escapeHtml(t("pet.notFoundCta")) +
        "</a></div></div>";
      updatePageTitle();
      initReveal();
      return;
    }

    var name = display(pet.name);
    var photos = pet.photos || [];
    var secondPhoto = photos[1];
    var owner = display(pet.owner);
    var ownerPhone = pet.phone || pet.emergencyPhone;
    var emergencyPhone = pet.emergencyPhone || pet.phone;

    root.innerHTML =
      '<div class="container">' +
      '<nav class="breadcrumb" aria-label="Breadcrumb"><a href="pets.html">' +
      escapeHtml(t("nav.pets")) +
      "</a>" +
      icon("chevron-right") +
      '<span aria-current="page">' +
      escapeHtml(name) +
      "</span></nav>" +
      '<div class="pet-layout">' +
      '<div class="pet-gallery">' +
      '<figure class="photo-frame"><div class="photo-frame__inner">' +
      '<button class="photo-open" type="button" data-lightbox-index="0" aria-label="' +
      escapeHtml(t("aria.viewPhoto")) +
      '">' +
      photoVisual(pet, 0, { eager: true }) +
      '<span class="photo-badge">' +
      icon("shield-check") +
      escapeHtml(t("pet.active")) +
      "</span>" +
      '<span class="photo-caption"><strong>' +
      escapeHtml(name) +
      "</strong><span>" +
      escapeHtml(t("pet.photoMain")) +
      "</span></span>" +
      "</button></div></figure>" +
      (secondPhoto
        ? '<figure class="photo-frame photo-frame--secondary"><div class="photo-frame__inner">' +
          '<button class="photo-open" type="button" data-lightbox-index="1" aria-label="' +
          escapeHtml(t("aria.viewPhoto")) +
          '">' +
          photoVisual(pet, 1) +
          '<span class="photo-caption"><strong>' +
          escapeHtml(t("pet.photoLifestyle")) +
          "</strong><span>" +
          escapeHtml(name) +
          "</span></span>" +
          "</button></div></figure>"
        : "") +
      '<div class="gallery-note">' +
      icon("lock") +
      "<span>" +
      escapeHtml(pet.kind === "demo" ? t("pet.demoNote") : t("pet.rescueNote")) +
      "</span></div>" +
      "</div>" +
      '<div class="pet-info">' +
      '<header class="pet-intro"><span class="eyebrow">' +
      escapeHtml(t("pet.eyebrow")) +
      "</span>" +
      '<div class="pet-intro__title-row"><h1 class="pet-name">' +
      escapeHtml(name) +
      '</h1><span class="status-pill"><span class="status-dot"></span>' +
      escapeHtml(t("pet.active")) +
      "</span></div>" +
      '<p class="pet-id-line"><span>' +
      escapeHtml(t("pet.idLabel")) +
      "</span><strong>" +
      escapeHtml(pet.petId) +
      "</strong></p>" +
      '<div class="pet-tags">' +
      '<span class="pill">' +
      icon("paw") +
      escapeHtml(display(pet.species)) +
      "</span>" +
      '<span class="pill">' +
      icon("id-card") +
      escapeHtml(display(pet.breed)) +
      "</span>" +
      '<span class="pill">' +
      icon("pin") +
      escapeHtml(display(pet.location)) +
      "</span>" +
      "</div>" +
      '<div class="pet-actions">' +
      '<button class="btn btn--primary" type="button" data-open-id>' +
      icon("id-card") +
      escapeHtml(t("pet.digitalId")) +
      "</button>" +
      '<button class="btn btn--secondary" type="button" data-lost>' +
      icon("alert") +
      escapeHtml(t("pet.lostMode")) +
      "</button>" +
      '<a class="btn btn--ghost" href="' +
      escapeHtml(telHref(ownerPhone)) +
      '">' +
      icon("phone") +
      escapeHtml(t("pet.callOwner")) +
      "</a>" +
      "</div></header>" +
      '<div class="pet-sections">' +
      '<section class="panel"><div class="panel__head"><h2>' +
      icon("id-card") +
      escapeHtml(t("pet.identityTitle")) +
      '</h2><span class="panel__hint">PAWID</span></div><dl class="detail-grid">' +
      detailItem(t("pet.species"), display(pet.species)) +
      detailItem(t("pet.breed"), display(pet.breed)) +
      detailItem(t("pet.age"), display(pet.age)) +
      detailItem(t("pet.gender"), display(pet.gender)) +
      detailItem(t("pet.colour"), display(pet.colour)) +
      detailItem(t("pet.weight"), display(pet.weight)) +
      detailItem(t("pet.sterilised"), display(pet.sterilised)) +
      detailItem(t("pet.location"), display(pet.location)) +
      "</dl></section>" +
      '<section class="panel"><div class="panel__head"><h2>' +
      icon("heart") +
      escapeHtml(t("pet.personalityTitle")) +
      "</h2></div>" +
      '<blockquote class="personality-quote">' +
      escapeHtml(display(pet.personality)) +
      "</blockquote>" +
      '<dl class="favourite-row"><div class="favourite-row__icon">' +
      icon("treat") +
      "</div><div><dt>" +
      escapeHtml(display(pet.favouriteLabel)) +
      "</dt><dd>" +
      escapeHtml(display(pet.favourites)) +
      "</dd></div></dl></section>" +
      '<section class="panel"><div class="panel__head"><h2>' +
      icon("medical") +
      escapeHtml(t("pet.healthTitle")) +
      "</h2></div>" +
      '<div class="health-grid">' +
      '<dl class="health-item"><dt>' +
      escapeHtml(t("pet.allergies")) +
      "</dt><dd>" +
      escapeHtml(display(pet.allergies)) +
      "</dd></dl>" +
      '<dl class="health-item"><dt>' +
      escapeHtml(t("pet.medication")) +
      "</dt><dd>" +
      escapeHtml(display(pet.medication)) +
      "</dd></dl>" +
      "</div>" +
      '<div class="care-note">' +
      icon("paw") +
      "<div><span>" +
      escapeHtml(t("pet.care")) +
      "</span><p>" +
      escapeHtml(display(pet.care)) +
      "</p></div></div></section>" +
      '<section class="panel panel--tinted"><div class="panel__head"><h2>' +
      icon("alert") +
      escapeHtml(t("pet.emergencyTitle")) +
      "</h2></div>" +
      '<div class="emergency-grid">' +
      '<div class="contact-tile"><span class="contact-tile__label">' +
      icon("user") +
      escapeHtml(t("pet.owner")) +
      "</span><strong>" +
      escapeHtml(owner) +
      '</strong><a href="' +
      escapeHtml(telHref(ownerPhone)) +
      '">' +
      escapeHtml(ownerPhone) +
      "</a><small>" +
      escapeHtml(t("pet.ownerPrimary")) +
      "</small></div>" +
      '<div class="contact-tile"><span class="contact-tile__label">' +
      icon("phone") +
      escapeHtml(t("pet.emergencyContact")) +
      '</span><a href="' +
      escapeHtml(telHref(emergencyPhone)) +
      '">' +
      escapeHtml(emergencyPhone) +
      "</a><small>" +
      escapeHtml(t("pet.backup")) +
      "</small></div>" +
      "</div>" +
      '<div class="lost-instructions"><h3>' +
      icon("alert") +
      escapeHtml(t("pet.lostInstructions")) +
      "</h3><p>" +
      escapeHtml(display(pet.lost)) +
      "</p></div>" +
      '<div class="panel__actions">' +
      '<button class="btn btn--primary" type="button" data-lost>' +
      icon("alert") +
      escapeHtml(t("pet.lostMode")) +
      "</button>" +
      '<button class="btn btn--soft" type="button" data-open-id>' +
      icon("id-card") +
      escapeHtml(t("pet.digitalId")) +
      "</button>" +
      "</div></section>" +
      '<section class="panel"><div class="panel__head"><h2>' +
      icon("lock") +
      escapeHtml(t("pet.privacyTitle")) +
      "</h2></div>" +
      '<div class="privacy-split">' +
      '<div class="privacy-half privacy-half--public"><h3>' +
      icon("shield-check") +
      escapeHtml(t("pet.publicInfo")) +
      "</h3><p>" +
      escapeHtml(t("pet.publicDesc")) +
      '</p></div><div class="privacy-half privacy-half--private"><h3>' +
      icon("lock") +
      escapeHtml(t("pet.privateInfo")) +
      "</h3><p>" +
      escapeHtml(t("pet.privateDesc")) +
      "</p></div></div></section>" +
      "</div></div></div>" +
      '<section class="id-section reveal"><div class="id-section__copy"><span class="eyebrow">' +
      escapeHtml(t("pet.digitalId")) +
      "</span><h2>" +
      escapeHtml(t("pet.digitalIdTitle")) +
      "</h2><p>" +
      escapeHtml(t("pet.digitalIdBody")) +
      '</p><div class="panel__actions"><button class="btn btn--primary" type="button" data-open-id>' +
      icon("id-card") +
      escapeHtml(t("pet.openId")) +
      '</button><button class="btn btn--ghost" type="button" data-print-card>' +
      icon("printer") +
      escapeHtml(t("pet.print")) +
      "</button></div></div>" +
      idCard(pet) +
      "</section>" +
      "</div>";

    document.body.classList.add("has-pet");

    updatePageTitle();
    initQrCodes(root);
    initReveal();

    if (!state.autoOpenedLost && params.get("lost") === "1") {
      state.autoOpenedLost = true;
      window.setTimeout(function () {
        openLostMode(pet);
      }, 80);
    }
  }

  /* ------------------------------------------------------------------------
     Create page
     ------------------------------------------------------------------------ */
  function speciesFor(value) {
    for (var i = 0; i < SPECIES_OPTIONS.length; i += 1) {
      if (SPECIES_OPTIONS[i].value === value) return SPECIES_OPTIONS[i];
    }
    return null;
  }

  function optionFor(options, value) {
    for (var i = 0; i < options.length; i += 1) {
      if (options[i].value === value) return options[i];
    }
    return null;
  }

  function slugCode(name) {
    var code = String(name || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 8);
    return code || "PET";
  }

  function nextSerial() {
    return String(loadCustomPets().length + 4).padStart(3, "0");
  }

  function fieldValue(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function selectedOptionLabel(id, fallback) {
    var el = document.getElementById(id);
    if (!el || !el.options || el.selectedIndex < 0) return fallback || "";
    return el.options[el.selectedIndex].textContent.trim() || fallback || "";
  }

  function updatePreview() {
    if (!document.getElementById("pet-preview")) return;
    var name = fieldValue("pet-name");
    var typeValue = fieldValue("animal-type");
    var species = speciesFor(typeValue);
    var breed = fieldValue("breed");
    var suburb = fieldValue("suburb");
    var nameEl = document.getElementById("preview-name");
    var speciesEl = document.getElementById("preview-species");
    var breedEl = document.getElementById("preview-breed");
    var locationEl = document.getElementById("preview-location");
    var idEl = document.getElementById("preview-id");
    var photoEl = document.getElementById("preview-photo");
    var qrEl = document.getElementById("preview-qr");

    if (nameEl) nameEl.textContent = name || t("create.previewName");
    if (speciesEl) {
      speciesEl.textContent = species
        ? species[state.lang] || species.en
        : t("create.previewAnimal");
    }
    if (breedEl) breedEl.textContent = breed || t("create.previewBreed");
    if (locationEl) locationEl.textContent = suburb || t("create.previewLocation");

    var code = slugCode(name);
    var petId = "PAW-" + code + "-" + String(state.previewSerial).padStart(3, "0");
    if (idEl) idEl.textContent = petId;

    if (photoEl) {
      if (state.photoData) {
        photoEl.innerHTML =
          '<img src="' +
          escapeHtml(state.photoData) +
          '" alt="' +
          escapeHtml(name || t("form.photo")) +
          '">';
      } else {
        var previewPet = { name: bi(name, name), photos: [] };
        photoEl.innerHTML = photoVisual(previewPet, 0, { eager: true });
      }
    }

    if (qrEl) qrEl.innerHTML = qrSvg(petId);
  }

  function clearErrors() {
    ["error-name", "error-type", "error-phone", "error-photo"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.hidden = true;
        el.textContent = "";
      }
    });
    ["pet-name", "animal-type", "owner-phone"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.removeAttribute("aria-invalid");
    });
  }

  function setError(fieldId, errorId, message) {
    var field = document.getElementById(fieldId);
    var error = document.getElementById(errorId);
    if (field) {
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", errorId);
    }
    if (error) {
      error.textContent = message;
      error.hidden = false;
    }
  }

  function resetPhoto() {
    state.photoData = null;
    var input = document.getElementById("pet-photo");
    var label = document.getElementById("upload-label");
    var preview = document.getElementById("upload-preview");
    if (input) input.value = "";
    if (label) label.hidden = false;
    if (preview) preview.hidden = true;
    updatePreview();
  }

  function resetCreateForm() {
    var form = document.getElementById("create-form");
    if (form) form.reset();
    clearErrors();
    resetPhoto();
    state.lastCreated = null;
    state.previewSerial = nextSerial();
    var success = document.getElementById("create-success");
    var layout = document.getElementById("form-layout");
    if (success) success.hidden = true;
    if (layout) layout.hidden = false;
    updatePreview();
    initQrCodes();
  }

  function compressImage(file) {
    return new Promise(function (resolve, reject) {
      if (!file || !/^image\//.test(file.type)) {
        reject(new Error("type"));
        return;
      }
      if (file.size > 12 * 1024 * 1024) {
        reject(new Error("size"));
        return;
      }
      var url = URL.createObjectURL(file);
      var image = new Image();
      image.onload = function () {
        try {
          var max = 1100;
          var scale = Math.min(1, max / Math.max(image.naturalWidth, image.naturalHeight));
          var canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
          canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.82));
        } catch (error) {
          reject(error);
        } finally {
          URL.revokeObjectURL(url);
        }
      };
      image.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error("decode"));
      };
      image.src = url;
    });
  }

  function handlePhoto(file) {
    if (!file) return;
    compressImage(file)
      .then(function (dataUrl) {
        state.photoData = dataUrl;
        var label = document.getElementById("upload-label");
        var preview = document.getElementById("upload-preview");
        var image = document.getElementById("upload-image");
        var fileName = document.getElementById("upload-name");
        if (label) label.hidden = true;
        if (preview) preview.hidden = false;
        if (image) {
          image.src = dataUrl;
          image.alt = fieldValue("pet-name") || t("form.photo");
        }
        if (fileName) fileName.textContent = file.name;
        updatePreview();
      })
      .catch(function (error) {
        showToast(t("errors.photo"));
        resetPhoto();
        if (error && error.message === "size") showToast(t("errors.photo"));
      });
  }

  function buildPetFromForm() {
    var name = fieldValue("pet-name");
    var typeValue = fieldValue("animal-type");
    var species = speciesFor(typeValue) || SPECIES_OPTIONS[6];
    var gender = optionFor(GENDER_OPTIONS, fieldValue("gender")) || GENDER_OPTIONS[2];
    var sterilised = optionFor(STERILISED_OPTIONS, fieldValue("sterilised")) || STERILISED_OPTIONS[2];
    var breed = fieldValue("breed");
    var age = fieldValue("birthday");
    var colour = fieldValue("colour");
    var weight = fieldValue("weight");
    var personality = fieldValue("personality");
    var favFood = fieldValue("fav-food");
    var favToy = fieldValue("fav-toy");
    var allergies = fieldValue("allergies");
    var medication = fieldValue("medication");
    var care = fieldValue("care-notes");
    var lost = fieldValue("lost-instructions");
    var ownerName = fieldValue("owner-name");
    var phone = fieldValue("owner-phone");
    var emergency = fieldValue("emergency-contact") || phone;
    var suburb = fieldValue("suburb");

    var favoriteLabel;
    var favourites;
    if (favFood && favToy) {
      favoriteLabel = bi("Favourite food & toys", "喜爱的食物和玩具");
      favourites = bi(favFood + " · " + favToy, favFood + " · " + favToy);
    } else if (favToy) {
      favoriteLabel = bi("Favourite toy", "喜爱的玩具");
      favourites = bi(favToy, favToy);
    } else {
      favoriteLabel = bi("Favourite food", "喜爱的食物");
      favourites = bi(favFood, favFood);
    }

    var code = slugCode(name);
    var serial = String(loadCustomPets().length + 4).padStart(3, "0");
    var id = "custom-" + code.toLowerCase() + "-" + Date.now().toString(36);

    var photos = [];
    if (state.photoData) {
      photos.push({
        src: state.photoData,
        alt: bi(name + " photo", name + " 的照片")
      });
    }

    return {
      id: id,
      petId: "PAW-" + code + "-" + serial,
      kind: "custom",
      category: species.category,
      name: bi(name, name),
      species: bi(species.en, species.zh),
      breed: bi(breed, breed),
      gender: bi(gender.en, gender.zh),
      age: bi(age, age),
      colour: bi(colour, colour),
      weight: bi(weight, weight),
      sterilised: bi(sterilised.en, sterilised.zh),
      location: bi(suburb, suburb),
      personality: bi(personality, personality),
      favouriteLabel: favoriteLabel,
      favourites: favourites,
      allergies: bi(allergies, allergies),
      medication: bi(medication, medication),
      care: bi(care, care),
      lost: bi(
        lost || "Please approach gently and calmly.",
        lost || "请温柔、慢慢地靠近我。"
      ),
      owner: bi(ownerName || "Owner", ownerName || "主人"),
      phone: phone,
      emergencyPhone: emergency,
      photos: photos,
      savedAt: new Date().toISOString()
    };
  }

  function renderSuccess(pet) {
    var nameEl = document.getElementById("success-name");
    var idEl = document.getElementById("success-id");
    var cardEl = document.getElementById("success-card");
    var viewLink = document.getElementById("success-view");
    if (nameEl) nameEl.textContent = display(pet.name);
    if (idEl) idEl.textContent = pet.petId;
    if (cardEl) cardEl.innerHTML = idCard(pet);
    if (viewLink) viewLink.setAttribute("href", petHref(pet));
    initQrCodes(cardEl || document);
  }

  function validateForm() {
    clearErrors();
    var valid = true;
    var name = fieldValue("pet-name");
    var type = fieldValue("animal-type");
    var phone = fieldValue("owner-phone");
    var firstInvalid = null;

    if (!name) {
      setError("pet-name", "error-name", t("errors.name"));
      valid = false;
      firstInvalid = document.getElementById("pet-name");
    }
    if (!type) {
      setError("animal-type", "error-type", t("errors.type"));
      valid = false;
      if (!firstInvalid) firstInvalid = document.getElementById("animal-type");
    }
    if (!phone) {
      setError("owner-phone", "error-phone", t("errors.phone"));
      valid = false;
      if (!firstInvalid) firstInvalid = document.getElementById("owner-phone");
    } else if (!isStaffordPhone(phone)) {
      setError("owner-phone", "error-phone", t("errors.phoneInvalid"));
      valid = false;
      if (!firstInvalid) firstInvalid = document.getElementById("owner-phone");
    }

    if (firstInvalid) firstInvalid.focus();
    return valid;
  }

  function initCreatePage() {
    var form = document.getElementById("create-form");
    if (!form) return;

    state.previewSerial = nextSerial();
    updatePreview();
    initQrCodes();

    form.addEventListener("input", function (event) {
      if (event.target && event.target.id === "pet-name") {
        var error = document.getElementById("error-name");
        if (error && !error.hidden && event.target.value.trim()) {
          error.hidden = true;
          event.target.removeAttribute("aria-invalid");
        }
      }
      if (event.target && event.target.id === "owner-phone") {
        var phoneError = document.getElementById("error-phone");
        if (phoneError && !phoneError.hidden && isStaffordPhone(event.target.value)) {
          phoneError.hidden = true;
          event.target.removeAttribute("aria-invalid");
        }
      }
      updatePreview();
    });

    form.addEventListener("change", function (event) {
      if (event.target && event.target.id === "animal-type") {
        var error = document.getElementById("error-type");
        if (error && !error.hidden && event.target.value) {
          error.hidden = true;
          event.target.removeAttribute("aria-invalid");
        }
      }
      updatePreview();
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validateForm()) return;
      var pet = buildPetFromForm();
      var existing = loadCustomPets();
      existing.push(pet);
      if (!saveCustomPets(existing)) {
        showToast(t("toast.saveError"));
        return;
      }
      state.lastCreated = pet;
      state.previewSerial = nextSerial();
      var layout = document.getElementById("form-layout");
      var success = document.getElementById("create-success");
      if (layout) layout.hidden = true;
      if (success) success.hidden = false;
      renderSuccess(pet);
      showToast(t("toast.created"));
      updatePageTitle();
      var scroller = success;
      if (scroller) {
        var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        scroller.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }
    });

    var photoInput = document.getElementById("pet-photo");
    if (photoInput) {
      photoInput.addEventListener("change", function () {
        if (photoInput.files && photoInput.files[0]) handlePhoto(photoInput.files[0]);
      });
    }

    var removePhoto = document.getElementById("remove-photo");
    if (removePhoto) {
      removePhoto.addEventListener("click", function () {
        resetPhoto();
      });
    }

    var upload = document.getElementById("upload");
    if (upload) {
      ["dragenter", "dragover"].forEach(function (name) {
        upload.addEventListener(name, function (event) {
          event.preventDefault();
          upload.classList.add("is-dragover");
        });
      });
      ["dragleave", "drop"].forEach(function (name) {
        upload.addEventListener(name, function (event) {
          event.preventDefault();
          upload.classList.remove("is-dragover");
        });
      });
      upload.addEventListener("drop", function (event) {
        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          handlePhoto(event.dataTransfer.files[0]);
        }
      });
    }

    var another = document.getElementById("create-another");
    if (another) {
      another.addEventListener("click", function () {
        resetCreateForm();
        var formCard = document.getElementById("create-form");
        if (formCard) {
          var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          formCard.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
          var first = document.getElementById("pet-name");
          if (first) window.setTimeout(function () { first.focus(); }, reduce ? 0 : 400);
        }
      });
    }
  }

  /* ------------------------------------------------------------------------
     Toasts
     ------------------------------------------------------------------------ */
  function showToast(message) {
    var stack = document.getElementById("toast-stack");
    if (!stack) return;
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.innerHTML = icon("check") + "<span>" + escapeHtml(message) + "</span>";
    stack.appendChild(toast);
    window.setTimeout(function () {
      toast.classList.add("is-leaving");
      window.setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 320);
    }, 3400);
  }

  /* ------------------------------------------------------------------------
     Header, navigation, reveal
     ------------------------------------------------------------------------ */
  function updateMenuAria() {
    var toggle = document.getElementById("menu-toggle");
    var menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;
    var open = !menu.hidden;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? t("aria.closeMenu") : t("aria.openMenu"));
  }

  function closeMenu() {
    var toggle = document.getElementById("menu-toggle");
    var menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    menu.hidden = true;
    updateMenuAria();
  }

  function toggleMenu() {
    var toggle = document.getElementById("menu-toggle");
    var menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;
    var open = menu.hidden;
    menu.hidden = !open;
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    updateMenuAria();
  }

  function initHeader() {
    var header = document.getElementById("site-header");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    var menu = document.getElementById("mobile-menu");
    if (menu) {
      menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
      });
    }

    document.addEventListener("click", function (event) {
      var toggle = event.target.closest("#menu-toggle");
      if (toggle) {
        toggleMenu();
        return;
      }
      var mobile = document.getElementById("mobile-menu");
      var headerEl = document.getElementById("site-header");
      if (mobile && !mobile.hidden && headerEl && !headerEl.contains(event.target)) {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  function initReveal() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    if (!state.observer) {
      state.observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              state.observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
      );
    }
    document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
      state.observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     Keyboard handling
     ------------------------------------------------------------------------ */
  function focusableElements(root) {
    return Array.prototype.slice
      .call(
        root.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      )
      .filter(function (el) {
        return el.offsetParent !== null || el === document.activeElement;
      });
  }

  function trapFocus(event, root) {
    if (event.key !== "Tab") return;
    var nodes = focusableElements(root);
    if (!nodes.length) return;
    var first = nodes[0];
    var last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleKeydown(event) {
    if (state.lostOpen) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLostMode();
        return;
      }
      var lostRoot = document.querySelector(".lost-mode");
      if (lostRoot) trapFocus(event, lostRoot);
      return;
    }

    if (state.overlay) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeOverlay();
        return;
      }
      if (state.overlay.type === "lightbox") {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          var total = state.overlay.pet.photos.length;
          openLightbox(state.overlay.pet, (state.overlay.index - 1 + total) % total);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          var total2 = state.overlay.pet.photos.length;
          openLightbox(state.overlay.pet, (state.overlay.index + 1) % total2);
        }
      }
      var modal = document.querySelector(".modal, .lightbox");
      if (modal) trapFocus(event, modal);
      return;
    }

    if (event.key === "Escape") closeMenu();
  }

  /* ------------------------------------------------------------------------
     Global click handling
     ------------------------------------------------------------------------ */
  function petFromEvent(event) {
    var trigger = event.target.closest("[data-pet]");
    if (trigger) return getPetById(trigger.dataset.pet);
    return state.currentPet;
  }

  function initClicks() {
    document.addEventListener("click", function (event) {
      var langButton = event.target.closest(".lang-btn");
      if (langButton) {
        setLanguage(langButton.dataset.lang);
        return;
      }

      var chip = event.target.closest(".filter-chip");
      if (chip) {
        state.filter = chip.dataset.filter || "all";
        renderPetsPage();
        return;
      }

      var openId = event.target.closest("[data-open-id]");
      if (openId) {
        event.preventDefault();
        var pet = petFromEvent(event);
        if (pet) openIdModal(pet);
        return;
      }

      var lost = event.target.closest("[data-lost]");
      if (lost) {
        event.preventDefault();
        var lostPet = petFromEvent(event);
        if (lostPet) openLostMode(lostPet);
        return;
      }

      var closeLost = event.target.closest("[data-close-lost]");
      if (closeLost) {
        event.preventDefault();
        closeLostMode();
        return;
      }

      var close = event.target.closest("[data-close-overlay]");
      if (close) {
        event.preventDefault();
        closeOverlay();
        return;
      }

      var lightboxButton = event.target.closest("[data-lightbox-index]");
      if (lightboxButton) {
        event.preventDefault();
        if (state.currentPet) openLightbox(state.currentPet, Number(lightboxButton.dataset.lightboxIndex));
        return;
      }

      var lightboxNav = event.target.closest("[data-lightbox-nav]");
      if (lightboxNav && state.overlay && state.overlay.type === "lightbox") {
        event.preventDefault();
        var total = state.overlay.pet.photos.length;
        var next = (state.overlay.index + Number(lightboxNav.dataset.lightboxNav) + total) % total;
        openLightbox(state.overlay.pet, next);
        return;
      }

      var printButton = event.target.closest("[data-print]");
      if (printButton) {
        event.preventDefault();
        window.print();
        return;
      }

      var printCard = event.target.closest("[data-print-card]");
      if (printCard) {
        event.preventDefault();
        if (state.currentPet) {
          openIdModal(state.currentPet);
          window.setTimeout(function () {
            window.print();
          }, 350);
        }
        return;
      }

      var waitlist = event.target.closest("[data-waitlist]");
      if (waitlist) {
        event.preventDefault();
        showToast(t("toast.waitlist"));
        return;
      }
    });
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  function detectLanguage() {
    var params = new URLSearchParams(window.location.search);
    var requested = params.get("lang");
    if (requested === "en" || requested === "zh") {
      storageSet(STORAGE.lang, requested);
      return requested;
    }
    var stored = storageGet(STORAGE.lang, "en");
    return stored === "zh" ? "zh" : "en";
  }

  function init() {
    injectSprite();
    state.lang = detectLanguage();
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    document.documentElement.classList.toggle("lang-zh", state.lang === "zh");
    document.documentElement.classList.add("js-reveal");

    var page = document.body.dataset.page;

    applyStaticTranslations();
    initHeader();
    initClicks();
    document.addEventListener("keydown", handleKeydown);
    initQrCodes();

    if (page === "home") renderFeatured();
    else if (page === "pets") renderPetsPage();
    else if (page === "pet") renderPetPage();
    else if (page === "create") initCreatePage();

    updatePageTitle();
    updateMenuAria();
    initReveal();

    // Fallback: never leave content hidden if the observer is delayed.
    window.setTimeout(function () {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 200) el.classList.add("is-visible");
      });
    }, 900);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
