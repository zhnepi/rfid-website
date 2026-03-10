// Auto-generated product data
export interface Product {
  name: string;
  description: string;
  specifications: Record<string, any>;
  images: string[];
  category: string;
  slug: string;
}

// 产品分类常量
export const CATEGORIES = {
  CARDS: 'RFID Cards',
  TAGS: 'RFID Tags',
  LABELS: 'RFID Labels',
  WRISTBANDS: 'RFID Wristbands',
  KEYFOB: 'RFID Keyfob',
  READERS: 'RFID Readers',
} as const;

export type CategoryType = typeof CATEGORIES[keyof typeof CATEGORIES];

export const products: Product[] = [
  {
    name: "RFID Card Inlay",
    description: "The RFID card inlay is the core component for producing the RFID card. This component contains an RFID chip and an antenna that enable the card to communicate with RFID readers. RFID card inlay enables card factories from the global world to produce printing cards efficiently and locally. Proud Tek RFID card inlay combines reliability, durability, and perfect electrical performance. It is also called smart card inlay or RFID prelam.",
    specifications: {"Product Name": "RFID Card Inlay", "Material": "PVC, ABS", "Thickness": "HF: 0.5mm, 0.45mm, 0.4mm; LF: 0.5mm, 0.55mm", "Layout": "2x5, 3x6, 3x7, 3x8, 4x5, 4x6, 4x7, 4x8, 4x10, 6x8", "Frequency": "125KHz, 13.56MHz", "Chip": {"HF": "NXP Mifare Classic 1K EV1, NXP Mifare 4k, Ultralight EV1, Ultralight C/ Ntag213/Desfire(2k, 4k, 8k) / iCode slix / legic, FM11RF08", "LF": "TK4100 / EM4200/ EM4305/ EM4450 / ATA5577, Hitag2, Hitag S256, etc."}, "Packing": "200 sheets / Carton"},
    images: ["/images/products/rfid-prelam-2x5-1-scaled.webp"],
    category: "RFID Cards",
    slug: "rfid-card-inlay"
  },
  {
    name: "Mini RFID Tag in Bullet Shape",
    description: "Mini RFID Tag in Bullet Shape is a small cylindric plastic RFID transponder. The copper antenna is winded on the magnetic core, which amplifies the RF field of the tag and offers a very good reading distance. Encapsulated by epoxy, the bullet tag is very robust. Featured with a small footprint, the tag is perfect to be embedded in objects with small space.",
    specifications: {"Product Name": "RFID Bullet Tag", "Model No.": "TBL1807", "Housing Material": "ABS, epoxy", "Dimension": "Ø7x18mm", "Protocol": "ISO14443, ISO7815, etc.", "Frequency": "125KHZ, 13.56MHZ", "Chip": "TK4100, EM4200, NXP MIFARE 1k/4K, FM11RF08, ICODE SLIX, HITAG2, etc.", "Reading distance": "3-10cm, depending on reader", "Color": "Black, and other colors can be customized", "Weight": "0.5g", "Working Temperature": "-20℃～70℃"},
    images: ["/images/products/mini-rfid-tag-in-bullet-shape.webp"],
    category: "RFID Tags",
    slug: "mini-rfid-tag"
  },
  {
    name: "RFID Cable Tie Tag",
    description: "RFID cable tie is an RFID transponder packed within PP or Nylon cable tie housing, widely used in the tracking of high-value items. It is designed with a long cable for easy fixation to assets. The disposable cable tie tag is for one-time usage for anti-theft, once tied onto other objects, the only way to open the tag is to cut off the cable, which will provide visual evidence of tamper. And the reusable cable tie tags can be repeatedly used.",
    specifications: {"Product Name": "RFID Cable Tie Tag", "Material": "PP, Nylon", "Color": "Red, green, yellow, blue, black, etc.", "Protocol": "ISO14443, ISO/IEC 18000-6C (Class 1 Gen2)", "Frequency": "13.56mhz, 915mhz", "Chip": "NXP Mifare 1K/4k, Ultralight ev1, Ultralight C, I Code slix, Ntag213/215/216, UCODE 8, UCODE 9", "Reading distance": "0.3-5 meters (depending on the reading device)", "Weight": "5g", "Pull Strength": "160-170N", "Lock Strength": "160-170N", "Working Temperature": "-30～85℃", "Installing": "Lock"},
    images: ["/images/products/rfid-cable-tie-1-495x400.webp"],
    category: "RFID Tags",
    slug: "rfid-cable-tie-tag"
  },
  {
    name: "RFID Waste Bin Tag",
    description: "RFID waste bin tag is designed to be screwed into a hole at the bottom of waste bins for waste bin tracking and management. Proud Tek's RFID waste bin tags are robust and versatile, they are waterproof, withstand normal chemicals, and are very durable. Integrated with RFID technology, the management work of waste bins could be dramatically improved, reduced loss and save labor costs.",
    specifications: {"Model Name": "RFID waste bin tag", "Model No.": "TWT3015", "Material": "ABS", "Size": "Φ30*15mm", "Color": "Black, red, orange, green, or customize", "Frequency": "LF, UHF", "Chip": "LF: EM4102,EM4100,EM4200,TK4100,GK4001; EM4305,EM4550,EM4069; T5577; Hitag1,Hitag2,HitagS256 UHF: Alien Higgs3", "Number printing": "Painting, laser engraving", "Mounting ways": "rivets, cable tie", "Operating Temperature": "(-20° to + 85°C)"},
    images: ["/images/products/rfid-bin-tag-495x400.webp"],
    category: "RFID Tags",
    slug: "rfid-waste-bin-tag"
  },
  {
    name: "RFID Nail Tag",
    description: "RFID Nail Tag is an RFID Transponder in nail shape. Encapsulated with ABS material, this nail tag is rust-resistant in humid and chemical environments, it is a perfect way to wood track. It is suitable for mounting in cement products, precast, plastic products, trees, and other non-metallic items. It can be customized with LF, HF, or UHF chips according to different application requirements.",
    specifications: {"Product": "RFID Nail Tag", "Color": "Black, white", "Housing Material": "ABS", "Dimension": "Φ8x36mm, Φ12x40mm, Φ22/25/28x41mm", "Frequency": "13.56MHz, 125khz, 915mhz", "Chip": "LF: TK4100, EM4200, EM4305, Hitag1 HF: Mifare classic 1k/4k, Ultralight EV1, Ultralight C, Ntag213/215/216 UHF: UCODE9, UCODE8", "Working Temperature": "-40～85℃", "Weight": "2~5g", "Installing": "Drill & Thwack with a rubber hammer, (for the hard wood, need to drill hole in advance)."},
    images: ["/images/products/SScAzOxcQWkDETCY.webp"],
    category: "RFID Tags",
    slug: "rfid-nail-tag"
  },
  {
    name: "Pallet RFID Tag",
    description: "Pallet RFID Tag is a passive RFID transponder customized for pallet management, encapsulated by Rugged ABS material, similar in size to the clamshell card(86x54mm), but with 4 holes on each corner of the tag, very convenient to be fixed on the pallet. The pallet tags are popularly used for the identification and locating of wooden or plastic pallets. It can dramatically improve the efficiency of warehouse management.",
    specifications: {"Product Name": "Pallet UHF Tag", "Model No.": "TTP8654", "Material": "ABS", "Dimension": "85.6*54*4mm", "Frequency": "UHF", "Chip": "H4", "Breaking Strength": ">800N", "Color": "White", "Printing": "silkscreen printing", "Package": "100pcs/box, 2000pcs/carton", "Coding": "Laser engraving, painting."},
    images: ["/images/products/Pallet-RFID-tag.webp"],
    category: "RFID Tags",
    slug: "pallet-rfid-tag"
  },
  {
    name: "Patching Type RFID Tyre Tag",
    description: "The Patching type RFID Tyre Tag is an RFID transponder designed to be attached to the wall of the truck and car tire by a specially formulated chemical adhesive layer, it is robust enough to withstand high-speed crashes, high pressure, and high temperature of the tire. With a unique identification number and user memory, it can store the tire's unique ID, and detailed information about the tire, including the tire's production data, its parameters, etc. Together with the RFID handheld terminals, it will be easy to track and manage the tyres.",
    specifications: {"Product Name": "Patch type RFID Tyre Tag", "Model No.": "TLT9535", "Material": "Rubber and Spring", "Dimension": "95*35*4mm", "Color": "Black or Blue", "Frequency": "865-868MHz or 902-928MHz", "Chip": "Monza R6 or Monza 4 QT", "Protocol": "ISO18000-6C", "Reading distance": "Fixed Reader(8dbi): 6 meters Handheld Reader (R2000/3dBi): 0.8 meters", "Weight": "6.4g", "Working Temperature": "-20℃～90℃", "Storage Temperature": "-25℃～100℃", "Mounting Method": "Adhesive"},
    images: ["/images/products/rfid-tyre-tag02.webp"],
    category: "RFID Tags",
    slug: "rfid-tyre-tag"
  },
  {
    name: "Spring RFID Tire Tag",
    description: "The Spring RFID Tire Tag has been developed to be embedded within the tire during the tire manufacturing process, where the Spring RFID tire Tag and the tire rubber will integrate and last the life time of the tire. During designing of this Spring TFID Tire Tag, we not only considered the high temperature of tire rubber vulcanizing, and also considered the tearing force, high pressure and high temperature caused by vehicles' high-speed crash and sudden braking. We can customize the RFID tire tag according to the rubber composite of different vehicle companies.",
    specifications: {"Product": "RFID Spring Tire Tag", "Model": "TLT8401", "Material": "Steel wire", "Dimension": "84x1mm/50x1mm", "Weight": "0.2g", "Working temperature": "-40℃~ +85℃", "Storage temperature": "-40℃~ +200℃", "Compliance": "ISO/IEC 18000-6 TypeC (EPC Gen2)", "Reading range": "About 2 meters", "Mounting ways": "Embedding", "Package": "100pcs/bag"},
    images: ["/images/products/rfid-tire-tag-495x400.webp"],
    category: "RFID Tags",
    slug: "spring-rfid-tire-tag"
  },
  {
    name: "On Metal High Temperature RFID Tag",
    description: "The On Metal High Temperature RFID Tag is specifically designed for metallic asset tracking in harsh environments, like high-temperature disinfection, and ultrasonic wave washing. It is mainly used for medical device maintenance, asset management in automatic production lines, auto production, molding injection, etc.",
    specifications: {"Product": "UHF High Temperature Metal Tag", "Model": "TGW4631", "Dimension": "48x36mm, thickness:7.5mm", "Material": "Engineering plastics", "Weight": "23.5g", "Working temperature": "-40℃ ~ +225℃", "Storage temperature": "-40℃ ~ +150℃", "Waterproof level": "IP68", "Compliance": "ISO/IEC18000-6C(EPC C1 G2)", "Reading range": "10~16m", "Mounting ways": "Screw, rivet, cable tie, adhesive", "Package": "50pcs/box"},
    images: ["/images/products/high-temperature-rfid-tag-495x400.webp"],
    category: "RFID Tags",
    slug: "high-temperature-rfid-tag"
  },
  {
    name: "Key Transponder",
    description: "Key transponder is a passive RFID transponder with tiny size and hard case, also called transponder chip. Containing high-quality ferrite and copper coil of accurate inductance, ProudTek's key transponder are built with new generation lead-frame production craft and molded under high temperatures, showing very stable performance. The key tranponder is mainly applied in automotive keys for identification. Because of its shape, it is also called brick tag or wedge transponder.",
    specifications: {"Product Name": "Key Transponder", "Material": "Epoxy", "Dimension": "12x6x2.2mm, 8x5x3mm, 11x3x2.2mm, 8x4x3mm, 11x5x3mm", "Frequency": "125KHz, 134.2KHz, 13.56MHz", "Chip": "TK4100, EM4200, EM4305, T5577, Hitag1, Hitag2, Hitag S256, FM11RF08, Mifare S50, Mifare S70, Mifare Ultralight, Mifare Desfire 2K/4K/8K", "Reading Distance": "2-10cm", "Working Temperature": "-40℃~+85℃", "Storage Temperature": "-40℃~+150℃"},
    images: ["/images/products/YulnSFQDMoFVmRaf.webp"],
    category: "RFID Tags",
    slug: "key-transponder"
  },
  {
    name: "RFID FPC Tag",
    description: "Proud Tek RFID FPC tag is a flexible RFID transponder integrated with an RFID chip, printed copper antenna, and high-temperature resistant polyimide(PI) substrate. The FPC tag performs stably and of a flexible feature. Because its antenna is produced by printing, the tag could be very small like a diameter of 5mm for space-limited applications.",
    specifications: {"Product Name": "Polyimide RFID Tag", "Material": "Polyimide", "Dimension": "Ø6/8/10mm, 5x5x0.13mm, 6x6x0.13mm, 7x7x0.13mm, 4.7x11.5mm, 6x15mm, 8x13mm", "Protocol": "ISO14443A, ISO15693", "Frequency": "13.56MHz, 860MHz-960Mhz", "Chip": "Mifare 1k EV1, Mifare 4k, Mifare Ultralgiht EV1, Mifare Ultralight C, NTAG213, Ntag215, Ntag216, ICODE SLIX, Desfire Ev1 2k/4k/8k", "Power Supply Mode": "Passive", "Working Temperature": "-40～200℃"},
    images: ["/images/products/13.56MHz-FPC-tag.webp"],
    category: "RFID Tags",
    slug: "rfid-fpc-tag"
  },
  {
    name: "RFID Ceramic Tag",
    description: "RFID Ceramic tag adopts ceramic elements, forming a high-strength durable structure. Different from normal RFID tags, ceramic tags rely on the excitation of displacement currents, which is a more efficient way to generate an electric current that drives the memory chip, improves the robustness to environmental fluctuations, allows a smaller footprint, and offers a much longer reading range. In case delicately matched readers and RFID chips are used, the reading distances of the UHF ceramic tags can reach 22 meters.",
    specifications: {"Product Name": "UHF Ceramic Tag", "Housing Material": "Ceramic", "Color": "Black", "Compliance": "ISO/IEC18000-6C, EPC Class 1, Gen 2", "Chip": "M4QT", "Frequency": "US: 902~928MHz, EU: 866~868MHz", "Waterproof level": "IP68", "Working Temperature": "-40 ~ 85 ℃", "Storage Temperature": "-40 ~ 150℃", "Installing Method": "self-adhesive", "Application": "apply to the surface of metal items"},
    images: ["/images/products/UHF-Ceramic-Tag.webp"],
    category: "RFID Tags",
    slug: "rfid-ceramic-tag"
  },
  {
    name: "13.56MHz RFID PCB Tag",
    description: "13.56MHz RFID PCB Tag is constructed with a printed antenna instead of wire antenna, which dramatically improves the consistency of the RFID tag. Meanwhile, it is very convenient to mount an extra capacitor onto the PCB for optimizing the performance of the RFID tag. The RFID PCB tag is high-temperature resistance. It is popularly used for producing RFID silicone wristbands and silimar RFID products manufacturing which must experience high temperatures.",
    specifications: {"Product Name": "13.56MHZ RFID PCB Tag", "Material": "FR4", "Dimension": "15 x 10 x 0.3mm, 13 x 8 x 0.3mm, 11.5 x 4.7 x 0.17mm; Ø18 x 0.4mm, Ø15 x 0.3mm, Ø10 x 0.3mm, Ø8 x 0.3mm", "Frequency": "13.56MHz", "Chip Available": "Mifare classic 1k, Mifare classic 4k, FM11RF08, Ultralight ev1, Ultralight C, Desfire 2K/4K/8K, Ntag213, Ntag215, Ntag216", "Reading distance": "2~5cm", "Storage temperature": "-40～150℃", "Working temperature": "-20 ~ 80℃", "Packing": "100pcs/bag", "Mounting way": "Embedding, Glue"},
    images: ["/images/products/RFID-PCB-Tag-HF.webp"],
    category: "RFID Tags",
    slug: "rfid-pcb-tag"
  },
  {
    name: "RFID PCB",
    description: "RFID PCB is a passive RFID tag that is made of very sturdy FR4 glass fiber material and has a stable printed antenna. Its thick design allows it to perform well on metal surfaces, which makes it widely adopted as an on metal RFID tag, mounted directly on the surface of metal objects like trucks, cans, forklifts, etc. It can also be used on other material surfaces like plastic and wood. To meet different size asset tracking requirements, various dimensions molds have been developed for customers to choose from. They can be made into very small or big sizes.",
    specifications: {"Product Name": "RFID PCB", "Color": "black", "Material": "Packing: FR4 glass fiber, Antenna: copper+gold", "Frequency": "865~868MHz, or 902~928MHz", "Standard": "ISO18000-6C, EPC Class1 Gen2", "Chip": "M4QT, H4", "Reading distance": "Depends on tag size and reader", "EPC Memory": "96 bit, can expand to 480 bit", "User Memory": "512 bit", "Working Temperature": "-40~100°C", "Storage Temperature": "-40~150°C", "Read write times": "100000 times", "Environment": "RoHS compliant", "Installing Method": "Adhesive, rivet, cable tie", "Personalization": "silk-screen printing, laser engraving, etc."},
    images: ["/images/products/PCB-RFID-Tag-1.webp"],
    category: "RFID Tags",
    slug: "rfid-pcb"
  },
  {
    name: "Silicone Laundry Tag",
    description: "Silicone laundry tag is RFID tag embedded into silicone material, it is extremely soft, resilient, and meanwhile can be conveniently attached to clothes seamlessly. We can insert the silicone rfid laundry tag into the hem of clothes, or sew it to clothes. Durability and washability are other advantages of the silicone UHF laundry tag, it can be repeatedly washed by 200 times with an extremely low failure rate.",
    specifications: {"Product Name": "Silicone RFID Laundry Tag", "Model No.": "LTD201", "Material": "Silicone", "Dimension": "55 x 12 x 2.5mm", "Color": "White", "Weight": "2.1g", "Compliance": "ISO/IEC 18000-6 TypeC (EPC Gen2)", "Frequency": "860-960MHz", "Chip": "Monza 4QT", "Reading Distance": "about 3~5m by handheld reader", "Waterproof level": "IP68", "Resistant chemicals": "most common laundry chemicals", "Operation Temperature": "-50 ~220 ℃", "Pressure environment": "resistant to 60 bar", "Packing": "100pcs/bag", "Tagging": "Sew the silicone RFID laundry tags into the seams and hems of garments, blankets, and other products; or place them in small pouches, then stitch them into a seam or hem."},
    images: ["/images/products/Silicone-laundry-tag.webp"],
    category: "RFID Tags",
    slug: "silicone-laundry-tag"
  },
  {
    name: "PPS Laundry Tag RFID button",
    description: "PPS laundry tag is a round plastic RFID button originally conceived for traceability application in industrial laundries. Encapsulated by thermoplastic housing of Poly Phenylene Sulfide(PPS) material, this tag is resistant to high temperature, chemical, and resistant to mechanical pressure. It is also suitable for industrial applications.",
    specifications: {"Product": "RFID PPS Laundry Tag", "Material": "PPS", "Working frequency": "125KHz, 13.56MHz, 865~868MHz, 902~928MHz", "Dimension": "LF/HF: D13/14/15/18/20/22/24/25.5/26/28/30mm, UHF: D18mm(2 holes), D20/30mm(no holes)", "Optional chips": "LF: TK4100, EM4200, EM4305, T5577, Hitag2/S256, HF: Mifare classic 1k/4k, Mifare ultralight, Ultralight C, Ultralight EV1, Ntag213/215/216, Icode, etc., UHF: UCODE7M", "Reading distance": "LF/HF: 2~5cm, UHF: 10~40cm", "Lifetime": "200 wash cycles", "Storage temperature": "-40°C~ +120°C", "Working temperature": "-25°C~+110°C", "Mounting ways": "By sewing or insert", "Waterproof level": "IP68", "Chemicals": "Normal chemicals in the washing process"},
    images: ["/images/products/laundry-tag-rfid.webp"],
    category: "RFID Tags",
    slug: "pps-laundry-tag-rfid-button"
  },
  {
    name: "RFID Windshield Tag",
    description: "Proud Tek RFID windshield tag is a rfid tag on car windshield, it is specially designed for fast and reliable vehicle identification in parking lots and highway toll lot charging. It is a UHF label with optimized reading performance on vehicle glass. This RFID windshield tag features of anti-tamper, which can greatly prevent the illegal replacement of fake labels. The pre-cut edge disables any attempt at transferring. Once moved, the antenna will be destroyed and the whole tag is void. In this way, it ensures the legitimacy and effectiveness of labels.",
    specifications: {"Product Name": "RFID windshield label", "Material": "PET, paper", "Dimension": "110 x 45mm, 98 x 27mm, or customized", "Working Protocol": "ISO18000-6C, EPC Global Class 1 Gen 2", "Frequency": "860~960MHz", "Working Mode": "Passive", "Personalization": "Single-sided printing, double-sided printing, barcode, series numbers, etc.", "Working temperature": "0~60°C"},
    images: ["/images/products/RFID-Windshield-Tag.webp"],
    category: "RFID Tags",
    slug: "rfid-windshield-tag"
  },
  {
    name: "Tamper Proof RFID Tag",
    description: "Proud Tek is supplying a series of Tampe Proof RFID Tag, which are non-transferable, once moved, the whole tag will be broken or void and unreadable by an RFID reader or scanner. Proud Tek's tamper proof RFID tag include 13.56MHz and UHF chips. The tamper proof RFID tag is widely used for tracking and managing high-value or high-security assets, like money transfer packages, driver licenses, identification cards, jewelry boxes, win caps, cigarettes package, cosmetics anti-fake, etc. And tamper proof NFC tags are also used a lot.",
    specifications: {"Product Name": "Tamper Proof RFID label", "Material": "Paper / breakable paper", "Dimension": "ø18/20/22/25/30mm, 40x25mm, etc.", "Supported Protocols": "ISO14443A, ISO18000-6C", "Frequency": "13.56MHZ, 860~960MHz", "Chip": "HF: MIFARE 1K, Mifare 4k, FM11RF08; ICODE SLI, NTAG DNA, Ntag213, Ntag215, Ntag216, etc. UHF: Alien H3, UCODE8", "Printing": "Logo printing, number printing, barcode, QR code", "Package": "In Roll"},
    images: ["/images/products/DkjrBzyjqxfDhiVn.webp"],
    category: "RFID Tags",
    slug: "tamper-proof-rfid-tag"
  },
  {
    name: "Library RFID Tags",
    description: "Library RFID Tags are one of the most popular RFID stickers, aslo called rfid library labels, its RFID chip will store unique identification and other updated information, which can be used for book query and anti-theft. RFID library book labels are widely used in library automatic management, providing convenient solutions for self-check-in / check-out, library book return, product sorting, etc., greatly improving the working efficiency and enhancing the user experience for libraries. Proud Tek is an experienced library rfid vendor.",
    specifications: {"Product Name": "Library RFID Tags", "Material": "Coated paper, PET, etc.", "Dimension": "50*50mm, 45*45mm, 50*80mm, 75*45mm, etc.", "Supported Protocols": "ISO14443A, ISO15693", "Frequency": "13.56MHZ", "Chip": "MIFARE 1K, Mifare 4k, FM11RF08; ICODE SLI, NTAG DNA, Ntag213, Ntag215, Ntag216, etc.", "Printing": "Logo printing, number printing, barcode, QR code", "Package": "In Roll or single piece"},
    images: ["/images/products/library-rfid-tags.webp"],
    category: "RFID Labels",
    slug: "library-rfid-tags"
  },
  {
    name: "UHF Library Label",
    description: "The UHF Library Label are designed for tracking and identifying documents, and files quickly and accurately. The RFID technology can automatically locate files in seconds, which greatly saves our time and cost for managing documents for certain organizations, like hospitals, law offices, banks, etc.",
    specifications: {"Product Name": "UHF Library Label", "Material": "Antenna: Aluminum etched, Substrate: Coated paper, Glue: Double-layer self-adhesive", "Tag dimension": "125x7mm, 104x5.5mm or customize", "Antenna size": "95x3mm", "Supported Protocols": "ISO18000-6C EPC GEN2", "Frequency": "860~960MHz", "Chip": "UCODE® 8/9, MR6-P", "Working Mode": "Passive", "Reading Distance": "6 meters", "Printing": "graphics, numbers, barcode", "Working Temperature": "-20℃ ～+50℃", "Storage Temperature": "-20℃ ～+85℃", "Shelf Life": "1 year at 23±5℃ / 50%±10%RH), the vacuum bag and avoid direct sunlight exposure.", "Reference Packing": "10,000 pcs/ roll, roll ID: 76 mm, roll OD < 300 mm, 10 rolls /carton"},
    images: ["/images/products/uhf-library-495x400.webp"],
    category: "RFID Labels",
    slug: "uhf-library-label"
  },
  {
    name: "RFID Jewellery Tags",
    description: "RFID Jewellery tags are specifically designed for jewelry tagging. The unique tail design makes it perfect for attaching to jewelry. And the etched aluminum antenna spreads over the whole tag including the tag tail, which prevents the label to be torn off easily without breaking the tag function. The RFID jewellery tags are typically used in jewelry stores, shopping mall jewelry counters, and jewelry manufacturers' warehouses, and can also be used as price tag for clothes and other commodities. The small RFID tags are an excellent way of enhancing the security of jewelry and also many other inventoried products, and it improves the efficiency of inventory checking and prevents stealing.",
    specifications: {"Product": "RFID Jewelry Tags", "Size": "68x26mm", "Surface Material": "PVC、PET、PP synthetic paper, thermal paper, etc", "Substrate": "PET with etched aluminum antenna", "Protocol": "ISO14443, ISO15693, (ISO/IEC 18000-6C, EPC Class1 Gen2)", "Frequency": "13.56mhz, 860-960mhz", "Chip": "NXP Mifare 1k, I-CODE-SLI; MONZA R6, MONZA R6P, UCODE8", "Printing": "Logo printing and number printing, QR code printing", "Working Mode": "Passive", "Working Temperature": "-10～60℃/20%～60% RH", "Storage Temperature": "20～30℃/20%～60% RH", "Shelf life": "1 year in the condition of 20～30℃/20%～60% RH", "Packing": "in roll"},
    images: ["/images/products/rfid-jewellery-tags.webp"],
    category: "RFID Tags",
    slug: "rfid-jewellery-tags"
  },
  {
    name: "UHF sticker",
    description: "UHF sticker is popularly used for tracking and managing inventory purposes. These UHF sticker can be used to monitor the location and status of products and equipment, improving efficiency and reducing the risk of loss or theft. The UHF RFID stickers are with much longer reading range, typically from 4-12 meters. The perfect bulk reading feature greatly improves work efficiency and accurateness for inventory management.",
    specifications: {"Product": "UHF sticker", "Surface Material": "Paper, PET, PVC, PP, Nylon", "Antenna": "aluminum etched", "Dimension": "45 x 20mm, 35x55mm, 20x75mm, 25x100mm, 12x100mm, 50x50mm, etc.", "Supported standards": "ISO18000-6B, ISO18000-6C(EPC GEN2)", "Frequency": "860-960MHz", "Chips": "Alien H3, H4, UCODE8, UCODE9, Monza R6, Monza R6P", "Memory": "128 bit, 800 bit, 448 bit", "Power Supply Mode": "Passive", "Reading distance": "4-12 m (depending on reading device)", "Typical Erase Time": "100, 000 times", "Personalization": "Logo printing, number printing, variable QR CODE", "Working Temperature": "-25～70℃", "Packing": "in single piece or in roll"},
    images: ["/images/products/UHF-sticker-495x400.webp"],
    category: "RFID Labels",
    slug: "uhf-sticker"
  },
  {
    name: "NFC Sticker",
    description: "NFC stickers are the most popular and cost-effective RFID products for inventory tracking and management. To meet different application environments, the surface material is optional with paper, PET, PVC, and PP. Different sizes are available in square shape or round shape. For visual identification and brand enhancement and easy tracking, the stickers can be printed with logo, series numbers, QR codes, etc. The adhesive layer enables the tags to be easily attached to the most flat surface.",
    specifications: {"Product": "13.56MHz RFID NFC Sticker", "Surface Material": "Paper, PET, PVC, PP, etc.", "Antenna": "Aluminum etched", "Dimension": "Φ18mm, Φ22mm, Φ25mm, Φ30mm, Φ35mm, Φ40mm, etc. 18x18mm, 20x20mm, 22x22mm, 25x25mm, 30x30mm, etc.", "Working Mode": "Passive", "Supported standards": "ISO14443/15693", "Frequency": "13.56mhz", "Chip": "NXP Mifare 1k, NXP Mifare 4k, Ultralight EV1, Ultralight C, I CODE SLIX, NTAG213/215/216, Desfire 2k/4k/8k", "Memory": "512 bits -4K byte", "Typical Erase Time": "100, 000", "Data Detention Time": "5 years", "Printing": "Offset printing, RFID Printer printing", "Working Temperature": "-25～70℃", "Humidity": "60%～90%", "Delivery": "single die cuts or on reel."},
    images: ["/images/products/iCQFvvwcihmbHWmo.webp"],
    category: "RFID Labels",
    slug: "nfc-sticker"
  },
  {
    name: "NFC epoxy card",
    description: "Proud Tek is professional in customizing NFC epoxy card in shapes as per our customers' artwork. People always want something different. If you don't want the boring credit card size RFID card, you could feel free to choose from our existing NFC epoxy card mold list, you could also design your own shape and authorize Proud Tek to customize it for you, and you could choose dripping epoxy over the card or not. The special and unique shape NFC epoxy tag are of great significance to your marketing, customer rewards, VIP, or loyalty campaigns, they are, very simply but of great marketing value for your business!",
    specifications: {"Product Name": "NFC epoxy card", "Dimension": "Choose from our model list or customize", "Material": "PVC, copper wire", "Frequency": "LH, HF", "Supported Standards": "ISO14443A, ISO15693", "Chip": "LH(125KHz): TK4100, EM4200, EM4305, T5577, HITAG1/2/S HF(13.56MHz): FM11RF08, Mifare S50/S70, Mifare Desfire 2K/4K/8K, Mifare ultralight, Mifare Plus, etc.", "Reading distance": "2-5cm (depending on reader)", "Working Temperature": "-40~60 ºC", "Data retention": "10 years", "Accessory": "lanyard or keyrings", "Packing": "single tag packed with poly bag", "Delivery": "By courier, air, or sea freight"},
    images: ["/images/products/NFC-epoxy-card.webp"],
    category: "RFID Cards",
    slug: "nfc-epoxy-card"
  },
  {
    name: "NFC Coin",
    description: "NFC coin or RFID Coin is a die-cut card. Laminated with white PVC material, the NFC coin can be customized into different diameters for being inserted into different sizes of products for identification and tracking. Or with an adhesive layer on the backside, the disc tag could be conveniently attached to products with a flat surface.",
    specifications: {"Product Name": "RFID Dis Tag", "Material": "PVC (PET is customizable), 3M adhesive layer", "Dimension": "Φ13 /14 / 15 / 18mm (13.56MHz Only) Φ20 / 23 / 25 / 30 / 35 / 40 / 50mm (125KHz/13.56MHz)", "Color": "white", "Frequency": "LF, HF", "Chip": "LF: EM4200, TK4100, ATA5577 HF: F08, S50, ultralight", "Working Mode": "Passive", "Printing": "Offset printing, silk screen printing", "Package": "2000pcs/carton", "Processing": "laminating", "Numbers Printing": "Painting, laser engraving", "Waterproof": "IP67 level"},
    images: ["/images/products/rfid-coin.webp"],
    category: "RFID Tags",
    slug: "nfc-coin"
  },
  {
    name: "RFID Clear Tag",
    description: "RFID Clear Tag is a non-standard RFID card. It is laminated with clear PVC material. And based on the different application requirements, the size and thickness are of wide choice, the diameter of 15mm~45mm, while its thickness is able to be 0.6mm to 1mm. It can be inserted into certain products or be attached by adhesive.",
    specifications: {"Material": "Clear PVC", "Dimension": "Ф15/18/20/25/30/35/40/50（mm), or square shape", "Thickness": "0.6mm-1mm", "Color": "Transparent", "Frequency": "125KHz, 13.56MHz", "Chip": "LF: EM4200, TK4100, ATA5577\n\nHF: F08, Mifare classic 1k ev1, ultralight ev1, Ntag213, Ntag215, etc.", "Reading distance": "2-10cm", "Working Mode": "Passive", "Printing": "Inkjet printing of ID", "Adhesive": "Normal adhesive or 3M adhesive layer is optional", "Package": "100pcs/opp bag, 1000pcs/carton", "Application": "Identification of dining plate/bowls in restaurant"},
    images: ["/images/products/RFID-Clear-tag.webp"],
    category: "RFID Tags",
    slug: "rfid-clear-tag"
  },
  {
    name: "RFID Clamshell Card",
    description: "The name of RFID Clamshell Card comes after its clamshell appearance. It is one of the earliest RFID card form factors, widely adopted in access control field. Mostly encapsulated with EM-ID chip, like EM4200, TK4100, also can encapsulate T5577 and MIFARE chips. It is with similar size as the credit card, but about double thicker. Because of its thickness and it has more space to contain much thick and more powerful RFID antenna, it is widely used to produce long distance application.",
    specifications: {"Product Name": "RFID Clamshell Card", "Material": "ABS", "Dimension": "85.5x54", "Thickness": "1.8mm", "Antenna Size": "37*63mm", "Wire Diameter": "Φ0.05mm", "Frequency": "125Khz, 13.56MHz", "Chip Optional": "TK4100, EM4200, ATA5577, MIFARE Classic EV1 1k, etc.", "Memory": "40bit to 128 bytes", "Reading distance": "5-120 cm, depends on reader", "Logo Printing": "Silkscreen printing on the ABS cards or attached with extra printing layer", "Weight": "8 gram / pc", "Working Temperature": "-20℃～60℃", "Package": "100pcs/box, 2500pcs/carton", "Application": "Identification, Access control, and Cashless payment"},
    images: ["/images/products/clamshel-card-450x450.webp"],
    category: "RFID Cards",
    slug: "rfid-clamshell-card"
  },
  {
    name: "RFID Wood Card",
    description: "Proud Tek's RFID wood card is superior in texture, thickness, and personalization craft. More and more hotels, holiday resorts, and clubs are using our NFC wooden cards for improving brand image, protecting the environment, and winning more market share. Features: 1, Eco-friendly: The wood material is naturally degradable, non-toxic, and harmless to the environment. 2, Elegant appearance: The wood material is giving pleasant visual, tactile, olfactory, and hygroscopic properties. RFID wooden cards' slim and hardwood design is impressive. 4, High-skill personalization: Proud Tek can laser the logo onto the cards for permanent visualization. We are also able to print colorful and complicated graphics and texts, including QR codes, Barcodes. Application: The RFID wood card has become the new favorite of successful people in today's society, it is more and more widely used in the following fields: 1, hotel door lock, resort, 2, loyalty management, High end club membership card 3, event in the form of wood RFID event wristband, wood badge ticket, etc.",
    specifications: {"Product Name": "RFID Wood Card", "Material": "Wood, bamboo", "Dimension": "85.6 x 54mm, or customized", "Thickness": "0.8mm, 1mm, 2mm, 3mm", "Frequency": "125KHz, 13.56MHz", "Chip": "LF: TK4100, EM4200, EM4305, T5577 HF: Mifare 1k, Mifare 4k, Ultralight EV1, Ultralight C, Ntag213/215/216, Desfire 2k/4k/8k", "Reading distance": "2-10cm", "Working Temperature": "-20~60 ºC", "Personalization": "Laser engraving, UV printing, silk screen printing"},
    images: ["/images/products/RFID-wood-card.webp"],
    category: "RFID Cards",
    slug: "rfid-wood-card-2"
  },
  {
    name: "RFID Paper Card",
    description: "RFID Paper card is made of coated paper, with the same size as credit cards or of die-cut customized dimensions, and are mainly used for single-time used tickets for light rail, trains, zoo parks, ski parks, tourism spots, etc. Sometimes called, RFID ticket. Compared with PVC cards, paper cards are more eco-friendly to use.",
    specifications: {"Product Name": "RFID Paper Card", "Material": "Coated paper 250 grams, 300 grams, 350 grams, 400 grams, 450 grams, etc.", "Frequency": "13.56mhz, 860-960mhz,", "Supported Standards": "ISO14443/15693, ISO18000-6C", "Chip": "HF: Mifare 1k, Mifare 4K, Ultralight EV1, Ultralight C, FM11RF08, Ntag213, Ntag215, etc. UHF: Alien H3, H9, Monza 4QT", "Dimension": "85.6*54*0.38mm, 86*54*0.5mm, 86*54*0.6mm, or customized", "Reading distance": "4-6cm (depending on reader)", "Printing": "4/4 CMYK printing, DOD numbers, DOD QR Code", "Working Temperature": "-25~70 ºC", "Packing": "In single pieces or in roll"},
    images: ["/images/products/RFID-Paper-Card-495x400.webp"],
    category: "RFID Cards",
    slug: "rfid-paper-card"
  },
  {
    name: "RFID Glass Tag",
    description: "RFID glass tag is enclosed in biocompatible glass tubes, which are harmless to animals. Proud Tek's RFID glass transponder constructed with ferrite wrapped with copper wire connected with RFID chip, is with superior reading distance. It can be injected into animal skin by syringe and work for animal identification and tracking. The RFID Glass tube tags greatly help pet owners, pet shops, farmers, and the government to identify and manage pets and animals. And it is also called glass transponder chip, widely used as the car key chip.",
    specifications: {"Product Name": "RFID glass tags", "Material": "Glass Tube (Biochemical glass tube optional)", "Frequency": "125KHz or 134.2KHz", "Supported Standards": "ISO11784/11785/11693", "Protocol": "FDX-A/FDX-B/HDX", "Optional Chip": "EM4200, EM4305, Hitag® S", "Dimension": "Φ1.25*7mm，Φ1.4*8mm, Φ2.12*12, Φ3*13mm, Φ3*15mm, Φ4*30mm", "Color": "Translucent", "Storage Temperature": "-20~60 ºC"},
    images: ["/images/products/RFID-glass-tag-495x400.webp"],
    category: "RFID Tags",
    slug: "rfid-glass-tag"
  },
  {
    name: "Printable RFID Metal Tag",
    description: "The printable RFID Metal Tag is thick RFID stickers folded with wave-absorbing foam material to shield the interference of metal. The tag body is soft and flexible, and can be easily attached with the adhesive glue to curved surface. Compared with traditional RFID on-metal tags with hard housing, the cost of UHF flexible on-metal tag is much more economical and it has a much wider application. The printable RFID metal tag is one of the most popular RFID on metal solution.",
    specifications: {"Product": "UHF Printable On Metal Tag", "Surface Material": "PET", "Chip": "Impinj Monza R6-P, NXP Ucode8", "Working frequency": "865-868MHz", "Working protocol": "EPC Class 1 Gen 2 (ISO 18000-6C)", "Dimension": "Normal tag: 40x25mm, 50x15mm, 60x25mm, 65x5mm, 65x35mm, 70x30mm, 80x25mm, 95x22mm, Tamperproof tag: 50x25mm, 70x25mm", "Reading range (on metal)": "2-7m", "Workable Printers": "Zebra RZ400/R11Xi4, Sato CL4NX, Toshiba SX-5, Postek, etc.", "Waterproof level": "IP68", "Working temperature": "-40°C～85°C", "Mounting ways": "By adhesive", "Package": "300/400/500pcs per roll"},
    images: ["/images/products/Printable-RFID-metal-tag.webp"],
    category: "RFID Tags",
    slug: "rfid-metal-tag"
  },
  {
    name: "RFID Reader Writer",
    description: "ProudTek offers a series of high-quality and advanced RFID reader writer, Reader writer modules with SDK software. They can be used as finished goods or as OEM solutions. Additionally, the Reader/Writer package includes a free Software Development Kit (SDK) as well as source-code software examples in the most popular programming languages. We also customize software according to different requirements. Our experienced engineer team will support you on various RFID reader and writer demands",
    specifications: {"Communication Interface": "TCP/IP", "Power Supply": "5V Regulated Power Supply or POE Power Supply; Maximum Operating Current: 400mA", "Support Operating System": "Windows, Linux, Android", "Support Protocol": "ISO/IEC 14443 TypeA, TypeB (optional), ISO/IEC 15693 (optional)", "Support Card type": "mifare Std 1K, mifare Std 4K, mifare UltraLight, Mifare Pro card, TypeA CPU card, TypeB CPU (optional), Icode2 (optional)", "Reading card speed": "106kbit/s, 212kbit/s, 424kbit/s, 848Kbit/s", "Reading distance": "≤5CM"},
    images: ["/images/products/RFID_reader_writer.webp"],
    category: "RFID Readers",
    slug: "rfid-reader-writer"
  },
  {
    name: "Textile RFID Laundry Tag",
    description: "Textile RFID laundry tags are also called RFID linen tags. Proud Tek textile RFID laundry tags are perfect for laundry tracking of garments, uniforms, bed linens, towels, and any other items that go through laundering or dry cleaning on periodic basis. The RFID laundry tag offers a cost-effective solution for industrial laundering applications and plays a vital duty in laundry management, enabling inventory visibility throughout the supply chain. The great durability of this tag even enables it to work for years and be reused in different unit garments, which greatly saves the owner's cost.",
    specifications: {"Product Name": "Fabric RFID Laundry Tag", "Dimension": "70 x 15mm, 70 x 10mm, 58 x 15mm, 55x10mm, 36x15mm", "Material": "Fabric", "Compliance": "EPC Class1 Gen2, ISO18000-6C", "Frequency": "865MHz to 960MHz (Global)", "Power Supply Mode": "Passive", "Chip": "NXP Ucode 8, Ucode 9", "Data Retention": "20 years", "Polarization": "Line polarization", "Weight": "About 0.6g / pc", "Color": "White", "Reading distance": "Up to 6 meters", "Storage temperature": "-40°C~ +110°C", "Operating temperature": "-25°C~ +110°C"},
    images: ["/images/products/textile-RFID-laundry-tag-heat-seal.webp"],
    category: "RFID Tags",
    slug: "textile-rfid-laundry-tag"
  },
  {
    name: "RFID Silicone Wristband",
    description: "Proud Tek's RFID silicone wristbands are made of eco-friendly silicone material, features of soft, waterproof, colorful and wearable. The silicone wristbands are widely used in fitness clubs, waterpark, swimming clubs, hotels, theme parks, etc. Embedded with RFID chip, Proud Tek's silicone wristbands are easily integrated into the vendors' system for identification, access control and cashless payment.",
    specifications: {"Product name": "RFID Silicone Wristbands", "Material": "Eco-friendly Silicone", "Dimension": "From Φ45mm to Φ72mm Or size adjustable type", "Waterproof level": "IP68", "Working Frequency": "125KHz, 13.56MHz", "Working protocol": "ISO14443A, ISO11784/5", "Chip available": "TK4100, EM4200, T5577 Mifare 1k, Mifare 4k, Ultralight EV1, Mifare Plus, Desfire 2k/4k/8k, Ntag213, Ntag215, Ntag216", "Logo printing": "Silkscreen printing colorful logo, Laser engrave logo", "Number printing": "QR code, barcode, serial number, etc", "Application": "Access control, cashless payment, electronic ticket, membership management, identification, etc."},
    images: ["/images/products/RFID-SIlicone-wristbands-006.webp"],
    category: "RFID Wristbands",
    slug: "rfid-silicone-wristband"
  },
  {
    name: "RFID Card",
    description: "RFID cards are a type of RFID technology that is commonly used for access control and payment systems. RFID cards work by emitting radio waves that are picked up by RFID readers, which then identify and authenticate the cardholder. This makes them an ideal solution for managing access to restricted areas, such as offices, schools, and hospitals. In addition to access control, RFID cards can also be used for cashless payments. By linking the card to the cardholder's bank account, payments can be made quickly and securely, without the need for cash or credit cards.",
    specifications: {"Product Name": "RFID card", "Dimension": "85.6 x 54mm, thickness 0.8-0.9mm", "Material": "PVC, PET, ABS", "Frequency": "125khz, 13.56mhz, 860-960mhz", "Supported Standards": "ISO14443A, ISO15693, Legic RF Standard, NFC A, EPC Class1 Gen2.ISO 18000-6C", "Chip": "LF: EM4102/EM4100,EM4550, EM4469, Atmel T5577, Hitag 1, Hitag 2, Hitag 2; HF: MIFARE® 1K(NXP), MIFARE® 4K(NXP), MIFARE® Ultralight ® (NXP), MIFARE® DESFire®, I CODE SLI, Tag-it HF Ti2048, Legic MIM256; UHF: H4, ALN – 9640, ALN – 9662, Monza® 4QT chip", "Function": "Read/write", "Memory": "40 bit to 128k byte EEPROM", "Reading range": "2~10cm", "Card finish": "Glossy, matte, frosted", "Working Temperature": "-25~70 ºC", "Delivery": "door to door via courier, by air, sea, railway transportation"},
    images: ["/images/products/ticket-smart-card.webp"],
    category: "RFID Cards",
    slug: "rfid-cards"
  },
  {
    name: "RFID Keyfob",
    description: "An RFID keyfob is a small device that is used for security protection and access control. It is also known as an RFID key tag or RFID keychain. RFID keyfobs are built with robust ABS, PPS or fiberglass house and are workable in various harsh environments. They can withstand cold or hot weather, humid or dry environments. The RFID keyfob has two major components: a microchip that stores data such as the unique ID and an antenna which is usually a coiled wire to receive and transmit data. It is generally more secure than physical keys but can still be vulnerable to certain exploits when not properly secured. The RFID fob does not carry any personal information and can be easily replaced if lost.",
    specifications: {"Frequencies": {"125KHz": ["EM4200", "TK4100", "EM4305", "T5577", "Hitag1", "Hitag2", "Higtag S"], "13.56MHz": ["Mifare 1k", "Mifare 4k", "Ultralight EV1", "Ultralight C", "Desfire EV1/2", "ICODE SLI", "NTAG213/215/216"], "860-960MHz": ["UCODE8", "UCODE9", "MR6P"]}, "Dual frequency fobs": ["125KHz+13.56MHz", "13.56MHz+UHF"], "Material": ["ABS", "PC", "PPS", "Nylon", "Wood", "Coconut Shell", "Fiber Glass"], "Glassfiber keyfob": {"weight": "2.2g", "temperature": "-30℃ to +100℃"}},
    images: ["/images/products/PROUDTEK-RFID-KEYFOB.webp"],
    category: "RFID Keyfob",
    slug: "rfid-keyfob"
  },
];

// 获取指定分类的产品
export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

// 获取所有分类
export function getAllCategories(): string[] {
  return Object.values(CATEGORIES);
}
