import React, {createRef, forwardRef, useEffect} from 'react';
import cytoscape from 'cytoscape'
import contextMenus from 'cytoscape-context-menus';
import 'cytoscape-context-menus/cytoscape-context-menus.css';

// register extension(context menu)
cytoscape.use(contextMenus as cytoscape.Ext);


const DiagramComponent = (props: any)=>{
    const divRef = createRef<HTMLDivElement>();
    useEffect(()=>{
        console.log("얄루")
        if (!divRef.current) {
            return;
        }        
        let graph: any = null
        const elements =  [
            // Nodes
            
            {"data" : {
                "id" : "430",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Aarauer Bierdeckel" ],
                "canonicalName" : "Aarauer Bierdeckel",
                "Milk" : "Raw cow's milk",
                "Synonym" : "Kuentener",
                "Quality" : 90,
                "Type" : "Semi-soft",
                "SUID" : 430,
                "NodeType" : "Cheese",
                "name" : "Aarauer Bierdeckel",
                "Country" : "Switzerland",
                "shared_name" : "Aarauer Bierdeckel"
              },
              "position" : {
                "x" : 4491.9853515625,
                "y" : 4520.1904296875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "429",
                "selected" : false,
                "cytoscape_alias_list" : [ "Bergues" ],
                "canonicalName" : "Bergues",
                "SUID" : 429,
                "NodeType" : "Cheese",
                "name" : "Bergues",
                "shared_name" : "Bergues"
              },
              "position" : {
                "x" : 4491.77880859375,
                "y" : 4647.23974609375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "428",
                "selected" : false,
                "cytoscape_alias_list" : [ "Chimay" ],
                "canonicalName" : "Chimay",
                "SUID" : 428,
                "NodeType" : "Cheese",
                "name" : "Chimay",
                "shared_name" : "Chimay"
              },
              "position" : {
                "x" : 4444.060546875,
                "y" : 4343.568359375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "427",
                "selected" : false,
                "cytoscape_alias_list" : [ "Fiumorbu" ],
                "canonicalName" : "Fiumorbu",
                "SUID" : 427,
                "NodeType" : "Cheese",
                "name" : "Fiumorbu",
                "shared_name" : "Fiumorbu"
              },
              "position" : {
                "x" : 4576.6962890625,
                "y" : 4617.2265625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "426",
                "selected" : false,
                "cytoscape_alias_list" : [ "Beaujolais" ],
                "canonicalName" : "Beaujolais",
                "SUID" : 426,
                "NodeType" : "RedWine",
                "name" : "Beaujolais",
                "shared_name" : "Beaujolais"
              },
              "position" : {
                "x" : 1391.1080322265625,
                "y" : 4324.1015625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "425",
                "selected" : false,
                "cytoscape_alias_list" : [ "Alsatian Pinot Blanc" ],
                "canonicalName" : "Alsatian Pinot Blanc",
                "SUID" : 425,
                "NodeType" : "WhiteWine",
                "name" : "Alsatian Pinot Blanc",
                "shared_name" : "Alsatian Pinot Blanc"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 3798.56884765625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "424",
                "selected" : false,
                "cytoscape_alias_list" : [ "California Sauvignon Blanc" ],
                "canonicalName" : "California Sauvignon Blanc",
                "SUID" : 424,
                "NodeType" : "WhiteWine",
                "name" : "California Sauvignon Blanc",
                "shared_name" : "California Sauvignon Blanc"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 4755.67529296875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "423",
                "selected" : false,
                "cytoscape_alias_list" : [ "Vouvray sec" ],
                "canonicalName" : "Vouvray sec",
                "SUID" : 423,
                "NodeType" : "WhiteWine",
                "name" : "Vouvray sec",
                "shared_name" : "Vouvray sec"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 2961.10107421875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "422",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Abbaye de Belloc" ],
                "canonicalName" : "Abbaye de Belloc",
                "Milk" : "Pasteurized sheep's milk",
                "Quality" : 79,
                "Type" : "Semi-hard",
                "SUID" : 422,
                "NodeType" : "Cheese",
                "name" : "Abbaye de Belloc",
                "Country" : "France",
                "shared_name" : "Abbaye de Belloc"
              },
              "position" : {
                "x" : 5092.990478515625,
                "y" : 4739.724853515625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "421",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Berkswell" ],
                "canonicalName" : "Berkswell",
                "Milk" : "Raw sheep's milk",
                "Quality" : 94,
                "Type" : "Semi-hard",
                "SUID" : 421,
                "NodeType" : "Cheese",
                "name" : "Berkswell",
                "Country" : "England",
                "shared_name" : "Berkswell"
              },
              "position" : {
                "x" : 5021.356689453125,
                "y" : 4779.760009765625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "420",
                "selected" : false,
                "cytoscape_alias_list" : [ "Le Moulis" ],
                "canonicalName" : "Le Moulis",
                "SUID" : 420,
                "NodeType" : "Cheese",
                "name" : "Le Moulis",
                "shared_name" : "Le Moulis"
              },
              "position" : {
                "x" : 5149.5029296875,
                "y" : 4867.46435546875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "419",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Spenwood" ],
                "canonicalName" : "Spenwood",
                "Milk" : "Raw sheep's milk",
                "Quality" : 99,
                "Type" : "Hard",
                "SUID" : 419,
                "NodeType" : "Cheese",
                "name" : "Spenwood",
                "Country" : "England",
                "shared_name" : "Spenwood"
              },
              "position" : {
                "x" : 5003.1142578125,
                "y" : 4624.55908203125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "418",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Vermont Shepherd" ],
                "canonicalName" : "Vermont Shepherd",
                "Milk" : "Raw ewe's milk",
                "Quality" : 98,
                "Type" : "Semi-soft",
                "SUID" : 418,
                "NodeType" : "Cheese",
                "name" : "Vermont Shepherd",
                "Country" : "US",
                "shared_name" : "Vermont Shepherd"
              },
              "position" : {
                "x" : 5007.8173828125,
                "y" : 4698.89111328125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "417",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Zamorano" ],
                "canonicalName" : "Zamorano",
                "Milk" : "Raw sheep's milk",
                "Quality" : 90,
                "Type" : "Hard",
                "SUID" : 417,
                "NodeType" : "Cheese",
                "name" : "Zamorano",
                "Country" : "Spain",
                "shared_name" : "Zamorano"
              },
              "position" : {
                "x" : 5135.268798828125,
                "y" : 4654.758056640625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "416",
                "selected" : false,
                "cytoscape_alias_list" : [ "California Zinfandel" ],
                "canonicalName" : "California Zinfandel",
                "SUID" : 416,
                "NodeType" : "RedWine",
                "name" : "California Zinfandel",
                "shared_name" : "California Zinfandel"
              },
              "position" : {
                "x" : 1391.1080322265625,
                "y" : 3787.948486328125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "415",
                "selected" : false,
                "cytoscape_alias_list" : [ "Carignan" ],
                "canonicalName" : "Carignan",
                "SUID" : 415,
                "NodeType" : "RedWine",
                "name" : "Carignan",
                "shared_name" : "Carignan"
              },
              "position" : {
                "x" : 1391.1080322265625,
                "y" : 3690.466064453125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "414",
                "selected" : false,
                "cytoscape_alias_list" : [ "Sancerre Rouge" ],
                "canonicalName" : "Sancerre Rouge",
                "SUID" : 414,
                "NodeType" : "RedWine",
                "name" : "Sancerre Rouge",
                "shared_name" : "Sancerre Rouge"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 2861.865478515625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "413",
                "selected" : false,
                "cytoscape_alias_list" : [ "German Riesling Kabinett" ],
                "canonicalName" : "German Riesling Kabinett",
                "SUID" : 413,
                "NodeType" : "WhiteWine",
                "name" : "German Riesling Kabinett",
                "shared_name" : "German Riesling Kabinett"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 3499.47314453125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "412",
                "selected" : false,
                "cytoscape_alias_list" : [ "White Bordeaux" ],
                "canonicalName" : "White Bordeaux",
                "SUID" : 412,
                "NodeType" : "WhiteWine",
                "name" : "White Bordeaux",
                "shared_name" : "White Bordeaux"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 3080.739501953125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "411",
                "selected" : false,
                "cytoscape_alias_list" : [ "White Burgundy" ],
                "canonicalName" : "White Burgundy",
                "SUID" : 411,
                "NodeType" : "WhiteWine",
                "name" : "White Burgundy",
                "shared_name" : "White Burgundy"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 3200.377685546875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "410",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Abondance" ],
                "canonicalName" : "Abondance",
                "Milk" : "Raw cow's milk",
                "Quality" : 90,
                "Type" : "Semi-hard",
                "SUID" : 410,
                "NodeType" : "Cheese",
                "name" : "Abondance",
                "Country" : "France",
                "shared_name" : "Abondance"
              },
              "position" : {
                "x" : 5198.38720703125,
                "y" : 4101.1241455078125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "409",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Beaufort" ],
                "canonicalName" : "Beaufort",
                "Milk" : "Raw cow's milk",
                "Quality" : 93,
                "Type" : "Hard",
                "SUID" : 409,
                "NodeType" : "Cheese",
                "name" : "Beaufort",
                "Country" : "France",
                "shared_name" : "Beaufort"
              },
              "position" : {
                "x" : 5272.58642578125,
                "y" : 4068.9853515625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "408",
                "selected" : false,
                "cytoscape_alias_list" : [ "Comte" ],
                "canonicalName" : "Comte",
                "SUID" : 408,
                "NodeType" : "Cheese",
                "name" : "Comte",
                "shared_name" : "Comte"
              },
              "position" : {
                "x" : 5274.890625,
                "y" : 4186.771484375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "407",
                "Strength" : 4,
                "selected" : false,
                "cytoscape_alias_list" : [ "Vacherin Fribourgeois" ],
                "canonicalName" : "Vacherin Fribourgeois",
                "Milk" : "Cow's milk",
                "Quality" : 95,
                "Type" : "Hard",
                "SUID" : 407,
                "NodeType" : "Cheese",
                "name" : "Vacherin Fribourgeois",
                "Country" : "Switzerland",
                "shared_name" : "Vacherin Fribourgeois"
              },
              "position" : {
                "x" : 5024.53466796875,
                "y" : 4090.2454833984375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "406",
                "selected" : false,
                "cytoscape_alias_list" : [ "Aglianico del Vulture" ],
                "canonicalName" : "Aglianico del Vulture",
                "SUID" : 406,
                "NodeType" : "RedWine",
                "name" : "Aglianico del Vulture",
                "shared_name" : "Aglianico del Vulture"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 3349.277587890625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "405",
                "selected" : false,
                "cytoscape_alias_list" : [ "California Merlot" ],
                "canonicalName" : "California Merlot",
                "SUID" : 405,
                "NodeType" : "RedWine",
                "name" : "California Merlot",
                "shared_name" : "California Merlot"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 4177.8779296875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "404",
                "selected" : false,
                "cytoscape_alias_list" : [ "Periquita blend" ],
                "canonicalName" : "Periquita blend",
                "SUID" : 404,
                "NodeType" : "RedWine",
                "name" : "Periquita blend",
                "shared_name" : "Periquita blend"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 2228.22998046875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "403",
                "selected" : false,
                "cytoscape_alias_list" : [ "Super Tuscan blend" ],
                "canonicalName" : "Super Tuscan blend",
                "SUID" : 403,
                "NodeType" : "RedWine",
                "name" : "Super Tuscan blend",
                "shared_name" : "Super Tuscan blend"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 2959.347900390625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "402",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Afuega'l Pitu" ],
                "canonicalName" : "Afuega'l Pitu",
                "Milk" : "Raw cow's milk",
                "Quality" : 79,
                "Type" : "Semi-soft",
                "SUID" : 402,
                "NodeType" : "Cheese",
                "name" : "Afuega'l Pitu",
                "Country" : "Spain",
                "shared_name" : "Afuega'l Pitu"
              },
              "position" : {
                "x" : 3144.312255859375,
                "y" : 3255.0721435546875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "401",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Queso de los Beyos" ],
                "canonicalName" : "Queso de los Beyos",
                "Milk" : "Pasteurized cow's milk",
                "Quality" : 84,
                "Type" : "Hard",
                "SUID" : 401,
                "NodeType" : "Cheese",
                "name" : "Queso de los Beyos",
                "Country" : "Spain",
                "shared_name" : "Queso de los Beyos"
              },
              "position" : {
                "x" : 3137.41162109375,
                "y" : 3363.713134765625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "400",
                "selected" : false,
                "cytoscape_alias_list" : [ "Barbaresco" ],
                "canonicalName" : "Barbaresco",
                "SUID" : 400,
                "NodeType" : "RedWine",
                "name" : "Barbaresco",
                "shared_name" : "Barbaresco"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 3934.172119140625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "399",
                "selected" : false,
                "cytoscape_alias_list" : [ "Beaujolais cru" ],
                "canonicalName" : "Beaujolais cru",
                "SUID" : 399,
                "NodeType" : "RedWine",
                "name" : "Beaujolais cru",
                "shared_name" : "Beaujolais cru"
              },
              "position" : {
                "x" : 1391.1080322265625,
                "y" : 4421.583984375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "398",
                "selected" : false,
                "cytoscape_alias_list" : [ "Cotes-du-Rhone" ],
                "canonicalName" : "Cotes-du-Rhone",
                "SUID" : 398,
                "NodeType" : "WhiteWine",
                "name" : "Cotes-du-Rhone",
                "shared_name" : "Cotes-du-Rhone"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 3978.0263671875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "397",
                "selected" : false,
                "cytoscape_alias_list" : [ "Pinot Noir" ],
                "canonicalName" : "Pinot Noir",
                "SUID" : 397,
                "NodeType" : "RedWine",
                "name" : "Pinot Noir",
                "shared_name" : "Pinot Noir"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 2130.74755859375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "396",
                "selected" : false,
                "cytoscape_alias_list" : [ "Red Bordeaux" ],
                "canonicalName" : "Red Bordeaux",
                "SUID" : 396,
                "NodeType" : "RedWine",
                "name" : "Red Bordeaux",
                "shared_name" : "Red Bordeaux"
              },
              "position" : {
                "x" : 1391.1080322265625,
                "y" : 2374.45361328125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "395",
                "selected" : false,
                "cytoscape_alias_list" : [ "Ribera del Duero" ],
                "canonicalName" : "Ribera del Duero",
                "SUID" : 395,
                "NodeType" : "RedWine",
                "name" : "Ribera del Duero",
                "shared_name" : "Ribera del Duero"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 2569.41845703125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "394",
                "selected" : false,
                "cytoscape_alias_list" : [ "Alsatian Riesling" ],
                "canonicalName" : "Alsatian Riesling",
                "SUID" : 394,
                "NodeType" : "WhiteWine",
                "name" : "Alsatian Riesling",
                "shared_name" : "Alsatian Riesling"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 4037.845947265625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "393",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Aisy Cendre" ],
                "canonicalName" : "Aisy Cendre",
                "Milk" : "Cow's milk",
                "Quality" : 78,
                "Type" : "Soft",
                "SUID" : 393,
                "NodeType" : "Cheese",
                "name" : "Aisy Cendre",
                "Country" : "France",
                "shared_name" : "Aisy Cendre"
              },
              "position" : {
                "x" : 4469.5517578125,
                "y" : 4437.06689453125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "392",
                "selected" : false,
                "cytoscape_alias_list" : [ "Affidelice" ],
                "canonicalName" : "Affidelice",
                "SUID" : 392,
                "NodeType" : "Cheese",
                "name" : "Affidelice",
                "shared_name" : "Affidelice"
              },
              "position" : {
                "x" : 4607.4560546875,
                "y" : 4468.19384765625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "391",
                "selected" : false,
                "cytoscape_alias_list" : [ "Epoisses" ],
                "canonicalName" : "Epoisses",
                "SUID" : 391,
                "NodeType" : "Cheese",
                "name" : "Epoisses",
                "shared_name" : "Epoisses"
              },
              "position" : {
                "x" : 4502.9345703125,
                "y" : 4320.02197265625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "390",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Soumaintrain" ],
                "canonicalName" : "Soumaintrain",
                "Milk" : "Cow's milk",
                "Quality" : 80,
                "Type" : "Soft",
                "SUID" : 390,
                "NodeType" : "Cheese",
                "name" : "Soumaintrain",
                "Country" : "France",
                "shared_name" : "Soumaintrain"
              },
              "position" : {
                "x" : 4336.97607421875,
                "y" : 4377.66162109375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "389",
                "selected" : false,
                "cytoscape_alias_list" : [ "California Cabernet Sauvignon" ],
                "canonicalName" : "California Cabernet Sauvignon",
                "SUID" : 389,
                "NodeType" : "RedWine",
                "name" : "California Cabernet Sauvignon",
                "shared_name" : "California Cabernet Sauvignon"
              },
              "position" : {
                "x" : 1391.1080322265625,
                "y" : 4275.3603515625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "388",
                "selected" : false,
                "cytoscape_alias_list" : [ "Argentinian Torrontes" ],
                "canonicalName" : "Argentinian Torrontes",
                "SUID" : 388,
                "NodeType" : "WhiteWine",
                "name" : "Argentinian Torrontes",
                "shared_name" : "Argentinian Torrontes"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 4157.484375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "387",
                "selected" : false,
                "cytoscape_alias_list" : [ "Italian Chardonnay" ],
                "canonicalName" : "Italian Chardonnay",
                "SUID" : 387,
                "NodeType" : "WhiteWine",
                "name" : "Italian Chardonnay",
                "shared_name" : "Italian Chardonnay"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 3020.920166015625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "386",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Appenzeller" ],
                "canonicalName" : "Appenzeller",
                "Milk" : "Cow's milk",
                "Quality" : 97,
                "Type" : "Semi-hard",
                "SUID" : 386,
                "NodeType" : "Cheese",
                "name" : "Appenzeller",
                "Country" : "Switzerland",
                "shared_name" : "Appenzeller"
              },
              "position" : {
                "x" : 5404.340576171875,
                "y" : 3876.0653076171875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "385",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Prattigauer" ],
                "canonicalName" : "Prattigauer",
                "Milk" : "Raw cow's milk",
                "Quality" : 97,
                "Type" : "Hard",
                "SUID" : 385,
                "NodeType" : "Cheese",
                "name" : "Prattigauer",
                "Country" : "Switzerland",
                "shared_name" : "Prattigauer"
              },
              "position" : {
                "x" : 5470.03271484375,
                "y" : 3960.2640380859375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "384",
                "selected" : false,
                "cytoscape_alias_list" : [ "Torgenburger" ],
                "canonicalName" : "Torgenburger",
                "SUID" : 384,
                "NodeType" : "Cheese",
                "name" : "Torgenburger",
                "shared_name" : "Torgenburger"
              },
              "position" : {
                "x" : 5506.146484375,
                "y" : 3803.1923828125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "383",
                "selected" : false,
                "cytoscape_alias_list" : [ "Barbera d'Alba" ],
                "canonicalName" : "Barbera d'Alba",
                "SUID" : 383,
                "NodeType" : "RedWine",
                "name" : "Barbera d'Alba",
                "shared_name" : "Barbera d'Alba"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 4031.654296875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "382",
                "selected" : false,
                "cytoscape_alias_list" : [ "Alsatian Gewurztraminer" ],
                "canonicalName" : "Alsatian Gewurztraminer",
                "SUID" : 382,
                "NodeType" : "WhiteWine",
                "name" : "Alsatian Gewurztraminer",
                "shared_name" : "Alsatian Gewurztraminer"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 3559.29248046875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "381",
                "selected" : false,
                "cytoscape_alias_list" : [ "Gruner Veltliner" ],
                "canonicalName" : "Gruner Veltliner",
                "SUID" : 381,
                "NodeType" : "WhiteWine",
                "name" : "Gruner Veltliner",
                "shared_name" : "Gruner Veltliner"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 3140.55859375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "380",
                "selected" : false,
                "cytoscape_alias_list" : [ "Tokay Pinot Gris" ],
                "canonicalName" : "Tokay Pinot Gris",
                "SUID" : 380,
                "NodeType" : "WhiteWine",
                "name" : "Tokay Pinot Gris",
                "shared_name" : "Tokay Pinot Gris"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 2602.186279296875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "379",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Ardrahan" ],
                "canonicalName" : "Ardrahan",
                "Milk" : "Pasteurized cow's milk",
                "Quality" : 91,
                "Type" : "Soft",
                "SUID" : 379,
                "NodeType" : "Cheese",
                "name" : "Ardrahan",
                "Country" : "Ireland",
                "shared_name" : "Ardrahan"
              },
              "position" : {
                "x" : 4350.19873046875,
                "y" : 4007.43701171875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "378",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Durrus" ],
                "canonicalName" : "Durrus",
                "Milk" : "Raw cow's milk",
                "Quality" : 91,
                "Type" : "Semi-soft",
                "SUID" : 378,
                "NodeType" : "Cheese",
                "name" : "Durrus",
                "Country" : "Ireland",
                "shared_name" : "Durrus"
              },
              "position" : {
                "x" : 4453.269775390625,
                "y" : 3937.269775390625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "377",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Gubbeen" ],
                "canonicalName" : "Gubbeen",
                "Milk" : "Pasteurized cow's milk",
                "Quality" : 83,
                "Type" : "Semi-soft",
                "SUID" : 377,
                "NodeType" : "Cheese",
                "name" : "Gubbeen",
                "Country" : "Ireland",
                "shared_name" : "Gubbeen"
              },
              "position" : {
                "x" : 4416.46484375,
                "y" : 4116.1328125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "376",
                "selected" : false,
                "cytoscape_alias_list" : [ "Milleens" ],
                "canonicalName" : "Milleens",
                "SUID" : 376,
                "NodeType" : "Cheese",
                "name" : "Milleens",
                "shared_name" : "Milleens"
              },
              "position" : {
                "x" : 4210.630859375,
                "y" : 3970.349365234375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "375",
                "selected" : false,
                "cytoscape_alias_list" : [ "California Pinot Noir" ],
                "canonicalName" : "California Pinot Noir",
                "SUID" : 375,
                "NodeType" : "RedWine",
                "name" : "California Pinot Noir",
                "shared_name" : "California Pinot Noir"
              },
              "position" : {
                "x" : 1391.1080322265625,
                "y" : 4080.3955078125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "374",
                "selected" : false,
                "cytoscape_alias_list" : [ "Nebbiolo" ],
                "canonicalName" : "Nebbiolo",
                "SUID" : 374,
                "NodeType" : "RedWine",
                "name" : "Nebbiolo",
                "shared_name" : "Nebbiolo"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 2520.67724609375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "373",
                "selected" : false,
                "cytoscape_alias_list" : [ "Syrah" ],
                "canonicalName" : "Syrah",
                "SUID" : 373,
                "NodeType" : "RedWine",
                "name" : "Syrah",
                "shared_name" : "Syrah"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 3056.830322265625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "372",
                "selected" : false,
                "cytoscape_alias_list" : [ "California Chardonnay" ],
                "canonicalName" : "California Chardonnay",
                "SUID" : 372,
                "NodeType" : "WhiteWine",
                "name" : "California Chardonnay",
                "shared_name" : "California Chardonnay"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 4396.7607421875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "371",
                "selected" : false,
                "cytoscape_alias_list" : [ "German Muskateller Kabinett" ],
                "canonicalName" : "German Muskateller Kabinett",
                "SUID" : 371,
                "NodeType" : "WhiteWine",
                "name" : "German Muskateller Kabinett",
                "shared_name" : "German Muskateller Kabinett"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 3738.749755859375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "370",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Azeitao" ],
                "canonicalName" : "Azeitao",
                "Milk" : "Raw sheep's milk",
                "Quality" : 92,
                "Type" : "Soft",
                "SUID" : 370,
                "NodeType" : "Cheese",
                "name" : "Azeitao",
                "Country" : "Portugal",
                "shared_name" : "Azeitao"
              },
              "position" : {
                "x" : 2782.90478515625,
                "y" : 3108.19482421875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "369",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Queso de la Serena" ],
                "canonicalName" : "Queso de la Serena",
                "Milk" : "Sheep's milk",
                "Quality" : 91,
                "Type" : "Soft",
                "SUID" : 369,
                "NodeType" : "Cheese",
                "name" : "Queso de la Serena",
                "Country" : "Spain",
                "shared_name" : "Queso de la Serena"
              },
              "position" : {
                "x" : 2630.59130859375,
                "y" : 3131.9404296875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "368",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Serpa" ],
                "canonicalName" : "Serpa",
                "Milk" : "Raw sheep's milk",
                "Quality" : 93,
                "Type" : "Soft",
                "SUID" : 368,
                "NodeType" : "Cheese",
                "name" : "Serpa",
                "Country" : "Spain",
                "shared_name" : "Serpa"
              },
              "position" : {
                "x" : 2757.61083984375,
                "y" : 3007.159423828125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "367",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Serra da Estrela" ],
                "canonicalName" : "Serra da Estrela",
                "Milk" : "Raw sheep's milk",
                "Quality" : 93,
                "Type" : "Soft",
                "SUID" : 367,
                "NodeType" : "Cheese",
                "name" : "Serra da Estrela",
                "Country" : "Portugal",
                "shared_name" : "Serra da Estrela"
              },
              "position" : {
                "x" : 2698.936279296875,
                "y" : 3054.8516845703125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "366",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Torta del Casar" ],
                "canonicalName" : "Torta del Casar",
                "Milk" : "Raw sheep's milk",
                "Quality" : 93,
                "Type" : "Soft",
                "SUID" : 366,
                "NodeType" : "Cheese",
                "name" : "Torta del Casar",
                "Country" : "Spain",
                "shared_name" : "Torta del Casar"
              },
              "position" : {
                "x" : 2714.351318359375,
                "y" : 3132.0548095703125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "365",
                "selected" : false,
                "cytoscape_alias_list" : [ "Barbera d'Asti" ],
                "canonicalName" : "Barbera d'Asti",
                "SUID" : 365,
                "NodeType" : "RedWine",
                "name" : "Barbera d'Asti",
                "shared_name" : "Barbera d'Asti"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 4129.13671875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "364",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Banon" ],
                "canonicalName" : "Banon",
                "Milk" : "Goat's milk",
                "Quality" : 81,
                "Type" : "Soft",
                "SUID" : 364,
                "NodeType" : "Cheese",
                "name" : "Banon",
                "Country" : "France",
                "shared_name" : "Banon"
              },
              "position" : {
                "x" : 5381.13232421875,
                "y" : 3378.84228515625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "363",
                "Strength" : 1,
                "selected" : false,
                "cytoscape_alias_list" : [ "Hoja Santa" ],
                "canonicalName" : "Hoja Santa",
                "Milk" : "Goat's milk",
                "Quality" : 74,
                "Type" : "Semi-soft",
                "SUID" : 363,
                "NodeType" : "Cheese",
                "name" : "Hoja Santa",
                "Country" : "US",
                "shared_name" : "Hoja Santa"
              },
              "position" : {
                "x" : 5282.986328125,
                "y" : 3421.955078125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "362",
                "selected" : false,
                "cytoscape_alias_list" : [ "Chianti Classico" ],
                "canonicalName" : "Chianti Classico",
                "SUID" : 362,
                "NodeType" : "RedWine",
                "name" : "Chianti Classico",
                "shared_name" : "Chianti Classico"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 3592.983642578125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "361",
                "selected" : false,
                "cytoscape_alias_list" : [ "Chardonnay Burgundy" ],
                "canonicalName" : "Chardonnay Burgundy",
                "SUID" : 361,
                "NodeType" : "WhiteWine",
                "name" : "Chardonnay Burgundy",
                "shared_name" : "Chardonnay Burgundy"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 4456.580078125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "360",
                "selected" : false,
                "cytoscape_alias_list" : [ "Sauvignon Blanc" ],
                "canonicalName" : "Sauvignon Blanc",
                "SUID" : 360,
                "NodeType" : "WhiteWine",
                "name" : "Sauvignon Blanc",
                "shared_name" : "Sauvignon Blanc"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 2063.814208984375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "359",
                "selected" : false,
                "cytoscape_alias_list" : [ "South Africa Chenin Blanc" ],
                "canonicalName" : "South Africa Chenin Blanc",
                "SUID" : 359,
                "NodeType" : "WhiteWine",
                "name" : "South Africa Chenin Blanc",
                "shared_name" : "South Africa Chenin Blanc"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 2362.909912109375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "358",
                "selected" : false,
                "cytoscape_alias_list" : [ "Emmental" ],
                "canonicalName" : "Emmental",
                "SUID" : 358,
                "NodeType" : "Cheese",
                "name" : "Emmental",
                "shared_name" : "Emmental"
              },
              "position" : {
                "x" : 5381.96533203125,
                "y" : 4184.009765625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "357",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Fontina d'Aosta" ],
                "canonicalName" : "Fontina d'Aosta",
                "Milk" : "Raw cow's milk",
                "Quality" : 86,
                "Type" : "Semi-hard",
                "SUID" : 357,
                "NodeType" : "Cheese",
                "name" : "Fontina d'Aosta",
                "Country" : "Italy",
                "shared_name" : "Fontina d'Aosta"
              },
              "position" : {
                "x" : 5140.753173828125,
                "y" : 4013.387939453125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "356",
                "Strength" : 6,
                "selected" : false,
                "cytoscape_alias_list" : [ "Gruyere" ],
                "canonicalName" : "Gruyere",
                "Milk" : "Raw cow's milk",
                "Quality" : 97,
                "Type" : "Hard",
                "SUID" : 356,
                "NodeType" : "Cheese",
                "name" : "Gruyere",
                "Country" : "Switzerland",
                "shared_name" : "Gruyere"
              },
              "position" : {
                "x" : 5288.501953125,
                "y" : 3964.68505859375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "355",
                "selected" : false,
                "cytoscape_alias_list" : [ "Madiran" ],
                "canonicalName" : "Madiran",
                "SUID" : 355,
                "NodeType" : "RedWine",
                "name" : "Madiran",
                "shared_name" : "Madiran"
              },
              "position" : {
                "x" : 1391.1080322265625,
                "y" : 2910.606689453125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "354",
                "selected" : false,
                "cytoscape_alias_list" : [ "German Riesling Spatlese" ],
                "canonicalName" : "German Riesling Spatlese",
                "SUID" : 354,
                "NodeType" : "WhiteWine",
                "name" : "German Riesling Spatlese",
                "shared_name" : "German Riesling Spatlese"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 3379.8349609375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "353",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Beenleigh Blue" ],
                "canonicalName" : "Beenleigh Blue",
                "Milk" : "Sheep's milk blue",
                "Quality" : 92,
                "Type" : "Semi-soft",
                "SUID" : 353,
                "NodeType" : "Cheese",
                "name" : "Beenleigh Blue",
                "Country" : "England",
                "shared_name" : "Beenleigh Blue"
              },
              "position" : {
                "x" : 4773.25830078125,
                "y" : 3174.656494140625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "352",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Harbourne Blue" ],
                "canonicalName" : "Harbourne Blue",
                "Milk" : "Pasteurized goat's milk blue",
                "Quality" : 90,
                "Type" : "Semi-soft",
                "SUID" : 352,
                "NodeType" : "Cheese",
                "name" : "Harbourne Blue",
                "Country" : "England",
                "shared_name" : "Harbourne Blue"
              },
              "position" : {
                "x" : 4882.623291015625,
                "y" : 3100.7001953125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "351",
                "Strength" : 6,
                "selected" : false,
                "cytoscape_alias_list" : [ "Roquefort" ],
                "canonicalName" : "Roquefort",
                "Milk" : "Raw sheep's milk",
                "Quality" : 98,
                "Type" : "Semi-soft",
                "SUID" : 351,
                "NodeType" : "Cheese",
                "name" : "Roquefort",
                "Country" : "France",
                "shared_name" : "Roquefort"
              },
              "position" : {
                "x" : 4653.99072265625,
                "y" : 3241.56396484375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "350",
                "Strength" : 4,
                "selected" : false,
                "cytoscape_alias_list" : [ "Berkshire Blue" ],
                "canonicalName" : "Berkshire Blue",
                "Milk" : "Raw cow's milk",
                "Quality" : 91,
                "Type" : "Semi-soft",
                "SUID" : 350,
                "NodeType" : "Cheese",
                "name" : "Berkshire Blue",
                "Country" : "US",
                "shared_name" : "Berkshire Blue"
              },
              "position" : {
                "x" : 4411.779052734375,
                "y" : 2989.2479248046875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "349",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Cashel Blue" ],
                "canonicalName" : "Cashel Blue",
                "Milk" : "Cow's milk blue",
                "Quality" : 84,
                "Type" : "Semi-soft",
                "SUID" : 349,
                "NodeType" : "Cheese",
                "name" : "Cashel Blue",
                "Country" : "Ireland",
                "shared_name" : "Cashel Blue"
              },
              "position" : {
                "x" : 4481.86279296875,
                "y" : 3055.999755859375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "348",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Fourme d'Ambert" ],
                "canonicalName" : "Fourme d'Ambert",
                "Milk" : "Raw cow's milk blue",
                "Quality" : 84,
                "Type" : "Semi-soft",
                "SUID" : 348,
                "NodeType" : "Cheese",
                "name" : "Fourme d'Ambert",
                "Country" : "France",
                "shared_name" : "Fourme d'Ambert"
              },
              "position" : {
                "x" : 4465.782470703125,
                "y" : 3114.009033203125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "347",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Pecorino Toscano" ],
                "canonicalName" : "Pecorino Toscano",
                "Milk" : "Sheep's milk",
                "Quality" : 81,
                "Type" : "Hard",
                "SUID" : 347,
                "NodeType" : "Cheese",
                "name" : "Pecorino Toscano",
                "Country" : "Italy",
                "shared_name" : "Pecorino Toscano"
              },
              "position" : {
                "x" : 4928.74755859375,
                "y" : 4728.83984375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "346",
                "Strength" : 4,
                "selected" : false,
                "cytoscape_alias_list" : [ "Trade Lake Cedar" ],
                "canonicalName" : "Trade Lake Cedar",
                "Milk" : "Raw sheep's milk",
                "Quality" : 80,
                "Type" : "Hard",
                "SUID" : 346,
                "NodeType" : "Cheese",
                "name" : "Trade Lake Cedar",
                "Country" : "US",
                "shared_name" : "Trade Lake Cedar"
              },
              "position" : {
                "x" : 4936.870849609375,
                "y" : 4846.70556640625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "345",
                "selected" : false,
                "cytoscape_alias_list" : [ "California Syrah-Mourvedre-Grenache Blend" ],
                "canonicalName" : "California Syrah-Mourvedre-Grenache Blend",
                "SUID" : 345,
                "NodeType" : "RedWine",
                "name" : "California Syrah-Mourvedre-Grenache Blend",
                "shared_name" : "California Syrah-Mourvedre-Grenache Blend"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 3885.430908203125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "344",
                "selected" : false,
                "cytoscape_alias_list" : [ "Red Burgundy" ],
                "canonicalName" : "Red Burgundy",
                "SUID" : 344,
                "NodeType" : "RedWine",
                "name" : "Red Burgundy",
                "shared_name" : "Red Burgundy"
              },
              "position" : {
                "x" : 1391.1080322265625,
                "y" : 2471.93603515625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "343",
                "selected" : false,
                "cytoscape_alias_list" : [ "German Gewurztraminer Spatlese" ],
                "canonicalName" : "German Gewurztraminer Spatlese",
                "SUID" : 343,
                "NodeType" : "WhiteWine",
                "name" : "German Gewurztraminer Spatlese",
                "shared_name" : "German Gewurztraminer Spatlese"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 3858.38818359375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "342",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Big Holmes" ],
                "canonicalName" : "Big Holmes",
                "Milk" : "Sheep's milk",
                "Quality" : 79,
                "Type" : "Soft",
                "SUID" : 342,
                "NodeType" : "Cheese",
                "name" : "Big Holmes",
                "Country" : "US",
                "shared_name" : "Big Holmes"
              },
              "position" : {
                "x" : 4936.81005859375,
                "y" : 2134.5550537109375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "341",
                "Strength" : 1,
                "selected" : false,
                "cytoscape_alias_list" : [ "Brin d'Amour" ],
                "canonicalName" : "Brin d'Amour",
                "Milk" : "Sheep's milk",
                "Synonym" : "Fleur du Maquis",
                "Quality" : 80,
                "Type" : "Soft",
                "SUID" : 341,
                "NodeType" : "Cheese",
                "name" : "Brin d'Amour",
                "Country" : "France",
                "shared_name" : "Brin d'Amour"
              },
              "position" : {
                "x" : 4832.2548828125,
                "y" : 2140.51708984375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "340",
                "selected" : false,
                "cytoscape_alias_list" : [ "Fleur du Maquis" ],
                "canonicalName" : "Fleur du Maquis",
                "SUID" : 340,
                "NodeType" : "Cheese",
                "name" : "Fleur du Maquis",
                "shared_name" : "Fleur du Maquis"
              },
              "position" : {
                "x" : 5045.72021484375,
                "y" : 2133.42626953125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "339",
                "selected" : false,
                "cytoscape_alias_list" : [ "Albarino" ],
                "canonicalName" : "Albarino",
                "SUID" : 339,
                "NodeType" : "WhiteWine",
                "name" : "Albarino",
                "shared_name" : "Albarino"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 3439.654296875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "338",
                "selected" : false,
                "cytoscape_alias_list" : [ "Savennieres" ],
                "canonicalName" : "Savennieres",
                "SUID" : 338,
                "NodeType" : "WhiteWine",
                "name" : "Savennieres",
                "shared_name" : "Savennieres"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 2123.63330078125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "337",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Bleu D'Auvergne" ],
                "canonicalName" : "Bleu D'Auvergne",
                "Milk" : "Raw cow's milk blue",
                "Quality" : 77,
                "Type" : "Semi-soft",
                "SUID" : 337,
                "NodeType" : "Cheese",
                "name" : "Bleu D'Auvergne",
                "Country" : "France",
                "shared_name" : "Bleu D'Auvergne"
              },
              "position" : {
                "x" : 4482.87939453125,
                "y" : 3194.19482421875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "336",
                "selected" : false,
                "cytoscape_alias_list" : [ "Bleu de Laqueuille" ],
                "canonicalName" : "Bleu de Laqueuille",
                "SUID" : 336,
                "NodeType" : "Cheese",
                "name" : "Bleu de Laqueuille",
                "shared_name" : "Bleu de Laqueuille"
              },
              "position" : {
                "x" : 4548.544921875,
                "y" : 3307.78564453125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "335",
                "Strength" : 4,
                "selected" : false,
                "cytoscape_alias_list" : [ "Bleu des Causses" ],
                "canonicalName" : "Bleu des Causses",
                "Milk" : "Cow's milk",
                "Quality" : 85,
                "Type" : "Semi-soft",
                "SUID" : 335,
                "NodeType" : "Cheese",
                "name" : "Bleu des Causses",
                "Country" : "France",
                "shared_name" : "Bleu des Causses"
              },
              "position" : {
                "x" : 4461.71142578125,
                "y" : 3277.53271484375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "334",
                "selected" : false,
                "cytoscape_alias_list" : [ "Fourme de Montbrison" ],
                "canonicalName" : "Fourme de Montbrison",
                "SUID" : 334,
                "NodeType" : "Cheese",
                "name" : "Fourme de Montbrison",
                "shared_name" : "Fourme de Montbrison"
              },
              "position" : {
                "x" : 4559.15771484375,
                "y" : 3212.3583984375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "333",
                "selected" : false,
                "cytoscape_alias_list" : [ "Rioja-style Tempranillo" ],
                "canonicalName" : "Rioja-style Tempranillo",
                "SUID" : 333,
                "NodeType" : "RedWine",
                "name" : "Rioja-style Tempranillo",
                "shared_name" : "Rioja-style Tempranillo"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 2666.90087890625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "332",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Bleu de Gex" ],
                "canonicalName" : "Bleu de Gex",
                "Milk" : "Raw cow's milk blue",
                "Quality" : 79,
                "Type" : "Semi-soft",
                "SUID" : 332,
                "NodeType" : "Cheese",
                "name" : "Bleu de Gex",
                "Country" : "France",
                "shared_name" : "Bleu de Gex"
              },
              "position" : {
                "x" : 4389.088623046875,
                "y" : 3038.9869384765625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "331",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Stilton" ],
                "canonicalName" : "Stilton",
                "Milk" : "Pasteurized cow's milk blue",
                "Quality" : 95,
                "Type" : "Semi-hard",
                "SUID" : 331,
                "NodeType" : "Cheese",
                "name" : "Stilton",
                "Country" : "England",
                "shared_name" : "Stilton"
              },
              "position" : {
                "x" : 4515.675537109375,
                "y" : 3005.5010986328125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "330",
                "Strength" : 4,
                "selected" : false,
                "cytoscape_alias_list" : [ "Bleu de Termignon" ],
                "canonicalName" : "Bleu de Termignon",
                "Milk" : "Raw cow's milk",
                "Quality" : 89,
                "Type" : "Semi-soft",
                "SUID" : 330,
                "NodeType" : "Cheese",
                "name" : "Bleu de Termignon",
                "Country" : "France",
                "shared_name" : "Bleu de Termignon"
              },
              "position" : {
                "x" : 4665.753662109375,
                "y" : 2885.416015625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "329",
                "selected" : false,
                "cytoscape_alias_list" : [ "Castelmagno" ],
                "canonicalName" : "Castelmagno",
                "SUID" : 329,
                "NodeType" : "Cheese",
                "name" : "Castelmagno",
                "shared_name" : "Castelmagno"
              },
              "position" : {
                "x" : 4615.5712890625,
                "y" : 2797.51025390625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "328",
                "selected" : false,
                "cytoscape_alias_list" : [ "Cahors" ],
                "canonicalName" : "Cahors",
                "SUID" : 328,
                "NodeType" : "RedWine",
                "name" : "Cahors",
                "shared_name" : "Cahors"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 4372.8427734375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "327",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Blu del Moncenisio" ],
                "canonicalName" : "Blu del Moncenisio",
                "Milk" : "Raw cow's milk",
                "Quality" : 82,
                "Type" : "Semi-soft",
                "SUID" : 327,
                "NodeType" : "Cheese",
                "name" : "Blu del Moncenisio",
                "Country" : "Italy",
                "shared_name" : "Blu del Moncenisio"
              },
              "position" : {
                "x" : 4552.231201171875,
                "y" : 2928.5150146484375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "326",
                "selected" : false,
                "cytoscape_alias_list" : [ "Murianengo" ],
                "canonicalName" : "Murianengo",
                "SUID" : 326,
                "NodeType" : "Cheese",
                "name" : "Murianengo",
                "shared_name" : "Murianengo"
              },
              "position" : {
                "x" : 4519.568359375,
                "y" : 2810.703125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "325",
                "Strength" : 1,
                "selected" : false,
                "cytoscape_alias_list" : [ "Bonde de Gatine" ],
                "canonicalName" : "Bonde de Gatine",
                "Milk" : "Raw goat's milk",
                "Quality" : 89,
                "Type" : "Soft",
                "SUID" : 325,
                "NodeType" : "Cheese",
                "name" : "Bonde de Gatine",
                "Country" : "France",
                "shared_name" : "Bonde de Gatine"
              },
              "position" : {
                "x" : 4180.340087890625,
                "y" : 2275.0948486328125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "324",
                "selected" : false,
                "cytoscape_alias_list" : [ "Chabichou du Poitou" ],
                "canonicalName" : "Chabichou du Poitou",
                "SUID" : 324,
                "NodeType" : "Cheese",
                "name" : "Chabichou du Poitou",
                "shared_name" : "Chabichou du Poitou"
              },
              "position" : {
                "x" : 4284.6875,
                "y" : 2322.64501953125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "323",
                "selected" : false,
                "cytoscape_alias_list" : [ "Clacbitou" ],
                "canonicalName" : "Clacbitou",
                "SUID" : 323,
                "NodeType" : "Cheese",
                "name" : "Clacbitou",
                "shared_name" : "Clacbitou"
              },
              "position" : {
                "x" : 4259.28515625,
                "y" : 2190.96533203125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "322",
                "selected" : false,
                "cytoscape_alias_list" : [ "Bandol" ],
                "canonicalName" : "Bandol",
                "SUID" : 322,
                "NodeType" : "RedWine",
                "name" : "Bandol",
                "shared_name" : "Bandol"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 3836.689697265625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "321",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Bra" ],
                "canonicalName" : "Bra",
                "Milk" : "Cow's milk",
                "Quality" : 80,
                "Type" : "Semi-soft",
                "SUID" : 321,
                "NodeType" : "Cheese",
                "name" : "Bra",
                "Country" : "Italy",
                "shared_name" : "Bra"
              },
              "position" : {
                "x" : 4659.313232421875,
                "y" : 2678.8431396484375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "320",
                "selected" : false,
                "cytoscape_alias_list" : [ "Raschera" ],
                "canonicalName" : "Raschera",
                "SUID" : 320,
                "NodeType" : "Cheese",
                "name" : "Raschera",
                "shared_name" : "Raschera"
              },
              "position" : {
                "x" : 4693.1904296875,
                "y" : 2569.873291015625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "319",
                "selected" : false,
                "cytoscape_alias_list" : [ "Barolo" ],
                "canonicalName" : "Barolo",
                "SUID" : 319,
                "NodeType" : "RedWine",
                "name" : "Barolo",
                "shared_name" : "Barolo"
              },
              "position" : {
                "x" : 1391.1080322265625,
                "y" : 4226.619140625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "318",
                "selected" : false,
                "cytoscape_alias_list" : [ "Dolcetto d'Alba" ],
                "canonicalName" : "Dolcetto d'Alba",
                "SUID" : 318,
                "NodeType" : "RedWine",
                "name" : "Dolcetto d'Alba",
                "shared_name" : "Dolcetto d'Alba"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 3105.571533203125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "317",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Brescianella Stagionata" ],
                "canonicalName" : "Brescianella Stagionata",
                "Milk" : "Cow's milk",
                "Quality" : 71,
                "Type" : "Soft",
                "SUID" : 317,
                "NodeType" : "Cheese",
                "name" : "Brescianella Stagionata",
                "Country" : "Italy",
                "shared_name" : "Brescianella Stagionata"
              },
              "position" : {
                "x" : 4275.779296875,
                "y" : 3728.873046875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "316",
                "selected" : false,
                "cytoscape_alias_list" : [ "Quercino" ],
                "canonicalName" : "Quercino",
                "SUID" : 316,
                "NodeType" : "Cheese",
                "name" : "Quercino",
                "shared_name" : "Quercino"
              },
              "position" : {
                "x" : 4332.2431640625,
                "y" : 3623.958740234375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "315",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Taleggio" ],
                "canonicalName" : "Taleggio",
                "Milk" : "Cow's milk washed rind",
                "Quality" : 83,
                "Type" : "Semi-soft",
                "SUID" : 315,
                "NodeType" : "Cheese",
                "name" : "Taleggio",
                "Country" : "Italy",
                "shared_name" : "Taleggio"
              },
              "position" : {
                "x" : 4236.678466796875,
                "y" : 3811.165283203125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "314",
                "selected" : false,
                "cytoscape_alias_list" : [ "Amarone della Valpolicella" ],
                "canonicalName" : "Amarone della Valpolicella",
                "SUID" : 314,
                "NodeType" : "RedWine",
                "name" : "Amarone della Valpolicella",
                "shared_name" : "Amarone della Valpolicella"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 3446.760009765625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "313",
                "selected" : false,
                "cytoscape_alias_list" : [ "Pinot Blanc" ],
                "canonicalName" : "Pinot Blanc",
                "SUID" : 313,
                "NodeType" : "WhiteWine",
                "name" : "Pinot Blanc",
                "shared_name" : "Pinot Blanc"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 2542.3671875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "312",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Brie de Melun" ],
                "canonicalName" : "Brie de Melun",
                "Milk" : "Raw cow's milk",
                "Quality" : 87,
                "Type" : "Soft",
                "SUID" : 312,
                "NodeType" : "Cheese",
                "name" : "Brie de Melun",
                "Country" : "France",
                "shared_name" : "Brie de Melun"
              },
              "position" : {
                "x" : 3942.391845703125,
                "y" : 4289.962646484375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "311",
                "selected" : false,
                "cytoscape_alias_list" : [ "Brie de Meaux" ],
                "canonicalName" : "Brie de Meaux",
                "SUID" : 311,
                "NodeType" : "Cheese",
                "name" : "Brie de Meaux",
                "shared_name" : "Brie de Meaux"
              },
              "position" : {
                "x" : 3869.9033203125,
                "y" : 4187.005859375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "310",
                "selected" : false,
                "cytoscape_alias_list" : [ "Brie de Nangis" ],
                "canonicalName" : "Brie de Nangis",
                "SUID" : 310,
                "NodeType" : "Cheese",
                "name" : "Brie de Nangis",
                "shared_name" : "Brie de Nangis"
              },
              "position" : {
                "x" : 3816.853271484375,
                "y" : 4263.388671875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "309",
                "Strength" : 1,
                "selected" : false,
                "cytoscape_alias_list" : [ "Coulommiers" ],
                "canonicalName" : "Coulommiers",
                "Milk" : "Cow's milk",
                "Quality" : 76,
                "Type" : "Soft",
                "SUID" : 309,
                "NodeType" : "Cheese",
                "name" : "Coulommiers",
                "Country" : "France",
                "shared_name" : "Coulommiers"
              },
              "position" : {
                "x" : 4085.3499755859375,
                "y" : 4381.658203125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "308",
                "selected" : false,
                "cytoscape_alias_list" : [ "Chilean Merlot" ],
                "canonicalName" : "Chilean Merlot",
                "SUID" : 308,
                "NodeType" : "RedWine",
                "name" : "Chilean Merlot",
                "shared_name" : "Chilean Merlot"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 3300.536376953125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "307",
                "selected" : false,
                "cytoscape_alias_list" : [ "New Zealand Sauvignon Blanc" ],
                "canonicalName" : "New Zealand Sauvignon Blanc",
                "SUID" : 307,
                "NodeType" : "WhiteWine",
                "name" : "New Zealand Sauvignon Blanc",
                "shared_name" : "New Zealand Sauvignon Blanc"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 2662.005615234375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "306",
                "Strength" : 6,
                "selected" : false,
                "cytoscape_alias_list" : [ "Cabrales" ],
                "canonicalName" : "Cabrales",
                "Milk" : "Raw cow's milk blue",
                "Quality" : 92,
                "Type" : "Semi-soft",
                "SUID" : 306,
                "NodeType" : "Cheese",
                "name" : "Cabrales",
                "Country" : "Spain",
                "shared_name" : "Cabrales"
              },
              "position" : {
                "x" : 4099.6712646484375,
                "y" : 3560.6492919921875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "305",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Gamonedo" ],
                "canonicalName" : "Gamonedo",
                "Milk" : "Raw cow's milk blue",
                "Quality" : 86,
                "Type" : "Semi-hard",
                "SUID" : 305,
                "NodeType" : "Cheese",
                "name" : "Gamonedo",
                "Country" : "Spain",
                "shared_name" : "Gamonedo"
              },
              "position" : {
                "x" : 4156.984130859375,
                "y" : 3620.6654052734375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "304",
                "selected" : false,
                "cytoscape_alias_list" : [ "Picon Beyes" ],
                "canonicalName" : "Picon Beyes",
                "SUID" : 304,
                "NodeType" : "Cheese",
                "name" : "Picon Beyes",
                "shared_name" : "Picon Beyes"
              },
              "position" : {
                "x" : 4045.441162109375,
                "y" : 3675.6923828125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "303",
                "Strength" : 6,
                "selected" : false,
                "cytoscape_alias_list" : [ "Valdeon" ],
                "canonicalName" : "Valdeon",
                "Milk" : "Pasteurized cow's milk blue",
                "Quality" : 92,
                "Type" : "Semi-hard",
                "SUID" : 303,
                "NodeType" : "Cheese",
                "name" : "Valdeon",
                "Country" : "Spain",
                "shared_name" : "Valdeon"
              },
              "position" : {
                "x" : 4228.146240234375,
                "y" : 3530.65576171875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "302",
                "selected" : false,
                "cytoscape_alias_list" : [ "Apple cider" ],
                "canonicalName" : "Apple cider",
                "SUID" : 302,
                "NodeType" : "Cider",
                "name" : "Apple cider",
                "shared_name" : "Apple cider"
              },
              "position" : {
                "x" : 1628.0069580078125,
                "y" : 4932.68505859375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "301",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Caerphilly" ],
                "canonicalName" : "Caerphilly",
                "Milk" : "Cow's milk",
                "Quality" : 93,
                "Type" : "Semi-hard",
                "SUID" : 301,
                "NodeType" : "Cheese",
                "name" : "Caerphilly",
                "Country" : "England",
                "shared_name" : "Caerphilly"
              },
              "position" : {
                "x" : 4081.0909423828125,
                "y" : 3318.9521484375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "300",
                "Strength" : 4,
                "selected" : false,
                "cytoscape_alias_list" : [ "Llangloffan" ],
                "canonicalName" : "Llangloffan",
                "Milk" : "Raw cow's milk",
                "Quality" : 82,
                "Type" : "Hard",
                "SUID" : 300,
                "NodeType" : "Cheese",
                "name" : "Llangloffan",
                "Country" : "Wales",
                "shared_name" : "Llangloffan"
              },
              "position" : {
                "x" : 3968.75146484375,
                "y" : 3223.787109375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "299",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Single Gloucester" ],
                "canonicalName" : "Single Gloucester",
                "Milk" : "Cow's milk",
                "Quality" : 89,
                "Type" : "Hard",
                "SUID" : 299,
                "NodeType" : "Cheese",
                "name" : "Single Gloucester",
                "Country" : "England",
                "shared_name" : "Single Gloucester"
              },
              "position" : {
                "x" : 4239.226806640625,
                "y" : 3420.3961181640625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "298",
                "selected" : false,
                "cytoscape_alias_list" : [ "Condrieu" ],
                "canonicalName" : "Condrieu",
                "SUID" : 298,
                "NodeType" : "WhiteWine",
                "name" : "Condrieu",
                "shared_name" : "Condrieu"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 4097.6650390625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "297",
                "selected" : false,
                "cytoscape_alias_list" : [ "Vouvray demi sec" ],
                "canonicalName" : "Vouvray demi sec",
                "SUID" : 297,
                "NodeType" : "WhiteWine",
                "name" : "Vouvray demi sec",
                "shared_name" : "Vouvray demi sec"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 2841.462890625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "296",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Camembert" ],
                "canonicalName" : "Camembert",
                "Milk" : "Cow's milk",
                "Quality" : 86,
                "Type" : "Soft",
                "SUID" : 296,
                "NodeType" : "Cheese",
                "name" : "Camembert",
                "Country" : "France",
                "shared_name" : "Camembert"
              },
              "position" : {
                "x" : 4194.798095703125,
                "y" : 4336.6953125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "295",
                "selected" : false,
                "cytoscape_alias_list" : [ "Brie" ],
                "canonicalName" : "Brie",
                "SUID" : 295,
                "NodeType" : "CheeseType",
                "name" : "Brie",
                "shared_name" : "Brie"
              },
              "position" : {
                "x" : 4058.296142578125,
                "y" : 4456.31591796875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "294",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Chaource" ],
                "canonicalName" : "Chaource",
                "Milk" : "Cow's milk",
                "Quality" : 74,
                "Type" : "Soft",
                "SUID" : 294,
                "NodeType" : "Cheese",
                "name" : "Chaource",
                "Country" : "France",
                "shared_name" : "Chaource"
              },
              "position" : {
                "x" : 4161.38623046875,
                "y" : 4421.001953125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "293",
                "selected" : false,
                "cytoscape_alias_list" : [ "Chardonnay" ],
                "canonicalName" : "Chardonnay",
                "SUID" : 293,
                "NodeType" : "WhiteWine",
                "name" : "Chardonnay",
                "shared_name" : "Chardonnay"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 4576.21826171875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "292",
                "Strength" : 4,
                "selected" : false,
                "cytoscape_alias_list" : [ "Canestrato Pugliese" ],
                "canonicalName" : "Canestrato Pugliese",
                "Milk" : "Sheep's milk",
                "Quality" : 91,
                "Type" : "Hard",
                "SUID" : 292,
                "NodeType" : "Cheese",
                "name" : "Canestrato Pugliese",
                "Country" : "Italy",
                "shared_name" : "Canestrato Pugliese"
              },
              "position" : {
                "x" : 3347.84033203125,
                "y" : 5143.10009765625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "291",
                "selected" : false,
                "cytoscape_alias_list" : [ "Canestrato Abbruzzese" ],
                "canonicalName" : "Canestrato Abbruzzese",
                "SUID" : 291,
                "NodeType" : "Cheese",
                "name" : "Canestrato Abbruzzese",
                "shared_name" : "Canestrato Abbruzzese"
              },
              "position" : {
                "x" : 3285.108642578125,
                "y" : 5053.474609375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "290",
                "selected" : false,
                "cytoscape_alias_list" : [ "Pecorino Romano" ],
                "canonicalName" : "Pecorino Romano",
                "SUID" : 290,
                "NodeType" : "Cheese",
                "name" : "Pecorino Romano",
                "shared_name" : "Pecorino Romano"
              },
              "position" : {
                "x" : 3412.45947265625,
                "y" : 5231.32421875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "289",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Cantal" ],
                "canonicalName" : "Cantal",
                "Milk" : "Cow's milk",
                "Quality" : 89,
                "Type" : "Hard",
                "SUID" : 289,
                "NodeType" : "Cheese",
                "name" : "Cantal",
                "Country" : "France",
                "shared_name" : "Cantal"
              },
              "position" : {
                "x" : 3721.639892578125,
                "y" : 3201.8572998046875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "288",
                "Strength" : 4,
                "selected" : false,
                "cytoscape_alias_list" : [ "Laguiole" ],
                "canonicalName" : "Laguiole",
                "Milk" : "Raw cow's milk",
                "Quality" : 91,
                "Type" : "Hard",
                "SUID" : 288,
                "NodeType" : "Cheese",
                "name" : "Laguiole",
                "Country" : "France",
                "shared_name" : "Laguiole"
              },
              "position" : {
                "x" : 3634.01806640625,
                "y" : 3130.4254150390625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "287",
                "Strength" : 4,
                "selected" : false,
                "cytoscape_alias_list" : [ "Lancashire" ],
                "canonicalName" : "Lancashire",
                "Milk" : "Raw cow's milk",
                "Quality" : 92,
                "Type" : "Hard",
                "SUID" : 287,
                "NodeType" : "Cheese",
                "name" : "Lancashire",
                "Country" : "England",
                "shared_name" : "Lancashire"
              },
              "position" : {
                "x" : 3860.6904296875,
                "y" : 3258.5821533203125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "286",
                "selected" : false,
                "cytoscape_alias_list" : [ "Salers" ],
                "canonicalName" : "Salers",
                "SUID" : 286,
                "NodeType" : "Cheese",
                "name" : "Salers",
                "shared_name" : "Salers"
              },
              "position" : {
                "x" : 3720.37109375,
                "y" : 3074.41357421875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "285",
                "selected" : false,
                "cytoscape_alias_list" : [ "Caprino Noccetto" ],
                "canonicalName" : "Caprino Noccetto",
                "SUID" : 285,
                "NodeType" : "Cheese",
                "name" : "Caprino Noccetto",
                "shared_name" : "Caprino Noccetto"
              },
              "position" : {
                "x" : 5475.89990234375,
                "y" : 3388.590576171875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "284",
                "Strength" : 1,
                "selected" : false,
                "cytoscape_alias_list" : [ "Caprino Noce" ],
                "canonicalName" : "Caprino Noce",
                "Milk" : "Mixed milk",
                "Quality" : 87,
                "Type" : "Soft",
                "SUID" : 284,
                "NodeType" : "Cheese",
                "name" : "Caprino Noce",
                "Country" : "Italy",
                "shared_name" : "Caprino Noce"
              },
              "position" : {
                "x" : 5402.652587890625,
                "y" : 3289.3675537109375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "283",
                "selected" : false,
                "cytoscape_alias_list" : [ "Australian Shiraz" ],
                "canonicalName" : "Australian Shiraz",
                "SUID" : 283,
                "NodeType" : "RedWine",
                "name" : "Australian Shiraz",
                "shared_name" : "Australian Shiraz"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 3739.207275390625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "282",
                "selected" : false,
                "cytoscape_alias_list" : [ "Malbec" ],
                "canonicalName" : "Malbec",
                "SUID" : 282,
                "NodeType" : "RedWine",
                "name" : "Malbec",
                "shared_name" : "Malbec"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 2813.124267578125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "281",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Cardinal Sin" ],
                "canonicalName" : "Cardinal Sin",
                "Milk" : "Cow's milk",
                "Quality" : 72,
                "Type" : "Semi-hard",
                "SUID" : 281,
                "NodeType" : "Cheese",
                "name" : "Cardinal Sin",
                "Country" : "England",
                "shared_name" : "Cardinal Sin"
              },
              "position" : {
                "x" : 4482.73046875,
                "y" : 4095.4327392578125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "280",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Munster" ],
                "canonicalName" : "Munster",
                "Milk" : "Cow's milk",
                "Quality" : 79,
                "Type" : "Soft",
                "SUID" : 280,
                "NodeType" : "Cheese",
                "name" : "Munster",
                "Country" : "France",
                "shared_name" : "Munster"
              },
              "position" : {
                "x" : 4555.68701171875,
                "y" : 4281.306884765625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "279",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Reblochon" ],
                "canonicalName" : "Reblochon",
                "Milk" : "Cow's milk",
                "Quality" : 84,
                "Type" : "Soft",
                "SUID" : 279,
                "NodeType" : "Cheese",
                "name" : "Reblochon",
                "Country" : "Switzerland",
                "shared_name" : "Reblochon"
              },
              "position" : {
                "x" : 4342.90087890625,
                "y" : 3947.3494873046875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "278",
                "selected" : false,
                "cytoscape_alias_list" : [ "Oregon Pinot Noir" ],
                "canonicalName" : "Oregon Pinot Noir",
                "SUID" : 278,
                "NodeType" : "RedWine",
                "name" : "Oregon Pinot Noir",
                "shared_name" : "Oregon Pinot Noir"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 2325.71240234375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "277",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Gorgonzola" ],
                "canonicalName" : "Gorgonzola",
                "Milk" : "Cow's milk",
                "Quality" : 85,
                "Type" : "Semi-soft",
                "SUID" : 277,
                "NodeType" : "Cheese",
                "name" : "Gorgonzola",
                "Country" : "Italy",
                "shared_name" : "Gorgonzola"
              },
              "position" : {
                "x" : 4578.397216796875,
                "y" : 3093.63720703125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "276",
                "Strength" : 6,
                "selected" : false,
                "cytoscape_alias_list" : [ "Catahoula" ],
                "canonicalName" : "Catahoula",
                "Milk" : "Raw cow's milk",
                "Quality" : 71,
                "Type" : "Semi-soft",
                "SUID" : 276,
                "NodeType" : "Cheese",
                "name" : "Catahoula",
                "Country" : "US",
                "shared_name" : "Catahoula"
              },
              "position" : {
                "x" : 4586.1708984375,
                "y" : 4179.28466796875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "275",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Livarot" ],
                "canonicalName" : "Livarot",
                "Milk" : "Cow's milk",
                "Quality" : 75,
                "Type" : "Semi-soft",
                "SUID" : 275,
                "NodeType" : "Cheese",
                "name" : "Livarot",
                "Country" : "France",
                "shared_name" : "Livarot"
              },
              "position" : {
                "x" : 4613.82568359375,
                "y" : 4236.03466796875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "274",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Pont l'Eveque" ],
                "canonicalName" : "Pont l'Eveque",
                "Milk" : "Cow's milk",
                "Quality" : 86,
                "Type" : "Semi-soft",
                "SUID" : 274,
                "NodeType" : "Cheese",
                "name" : "Pont l'Eveque",
                "Country" : "France",
                "shared_name" : "Pont l'Eveque"
              },
              "position" : {
                "x" : 4499.837158203125,
                "y" : 4157.002685546875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "273",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Centovalli Ticino" ],
                "canonicalName" : "Centovalli Ticino",
                "Milk" : "Raw cow's milk",
                "Quality" : 91,
                "Type" : "Semi-hard",
                "SUID" : 273,
                "NodeType" : "Cheese",
                "name" : "Centovalli Ticino",
                "Country" : "Switzerland",
                "shared_name" : "Centovalli Ticino"
              },
              "position" : {
                "x" : 5347.36572265625,
                "y" : 4029.7900390625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "272",
                "Strength" : 1,
                "selected" : false,
                "cytoscape_alias_list" : [ "Chabichou de Poitou" ],
                "canonicalName" : "Chabichou de Poitou",
                "Milk" : "Goat's milk",
                "Quality" : 88,
                "Type" : "Semi-soft",
                "SUID" : 272,
                "NodeType" : "Cheese",
                "name" : "Chabichou de Poitou",
                "Country" : "France",
                "shared_name" : "Chabichou de Poitou"
              },
              "position" : {
                "x" : 3870.7509765625,
                "y" : 2084.689208984375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "271",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Crottin de Chavignol" ],
                "canonicalName" : "Crottin de Chavignol",
                "Milk" : "Goat's milk",
                "Quality" : 78,
                "Type" : "Semi-soft",
                "SUID" : 271,
                "NodeType" : "Cheese",
                "name" : "Crottin de Chavignol",
                "Country" : "France",
                "shared_name" : "Crottin de Chavignol"
              },
              "position" : {
                "x" : 3817.332763671875,
                "y" : 2188.366943359375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "270",
                "selected" : false,
                "cytoscape_alias_list" : [ "Sancerre" ],
                "canonicalName" : "Sancerre",
                "SUID" : 270,
                "NodeType" : "WhiteWine",
                "name" : "Sancerre",
                "shared_name" : "Sancerre"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 2183.452392578125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "269",
                "Strength" : 1,
                "selected" : false,
                "cytoscape_alias_list" : [ "Explorateur" ],
                "canonicalName" : "Explorateur",
                "Milk" : "Cow's milk",
                "Quality" : 72,
                "Type" : "Soft",
                "SUID" : 269,
                "NodeType" : "Cheese",
                "name" : "Explorateur",
                "Country" : "France",
                "shared_name" : "Explorateur"
              },
              "position" : {
                "x" : 4075.381103515625,
                "y" : 4535.126708984375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "268",
                "Strength" : 1,
                "selected" : false,
                "cytoscape_alias_list" : [ "Roucoulons" ],
                "canonicalName" : "Roucoulons",
                "Milk" : "Pasteurized cow's milk",
                "Quality" : 72,
                "Type" : "Soft",
                "SUID" : 268,
                "NodeType" : "Cheese",
                "name" : "Roucoulons",
                "Country" : "Switzerland",
                "shared_name" : "Roucoulons"
              },
              "position" : {
                "x" : 4151.69140625,
                "y" : 4247.605224609375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "267",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Chaput Vacherin Mont D'Or" ],
                "canonicalName" : "Chaput Vacherin Mont D'Or",
                "Milk" : "Raw cow's milk",
                "Quality" : 76,
                "Type" : "Semi-soft",
                "SUID" : 267,
                "NodeType" : "Cheese",
                "name" : "Chaput Vacherin Mont D'Or",
                "Country" : "Canada",
                "shared_name" : "Chaput Vacherin Mont D'Or"
              },
              "position" : {
                "x" : 4355.500732421875,
                "y" : 4064.403076171875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "266",
                "Strength" : 4,
                "selected" : false,
                "cytoscape_alias_list" : [ "Krummenswiler Forsterkase" ],
                "canonicalName" : "Krummenswiler Forsterkase",
                "Milk" : "Raw cow's milk",
                "Quality" : 92,
                "Type" : "Soft",
                "SUID" : 266,
                "NodeType" : "Cheese",
                "name" : "Krummenswiler Forsterkase",
                "Country" : "Switzerland",
                "shared_name" : "Krummenswiler Forsterkase"
              },
              "position" : {
                "x" : 4358.00927734375,
                "y" : 4148.20751953125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "265",
                "selected" : false,
                "cytoscape_alias_list" : [ "Vacherin Mont d'Or" ],
                "canonicalName" : "Vacherin Mont d'Or",
                "SUID" : 265,
                "NodeType" : "Cheese",
                "name" : "Vacherin Mont d'Or",
                "shared_name" : "Vacherin Mont d'Or"
              },
              "position" : {
                "x" : 4280.3466796875,
                "y" : 4022.044921875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "264",
                "selected" : false,
                "cytoscape_alias_list" : [ "Cheddar" ],
                "canonicalName" : "Cheddar",
                "SUID" : 264,
                "NodeType" : "CheeseType",
                "name" : "Cheddar",
                "shared_name" : "Cheddar"
              },
              "position" : {
                "x" : 3274.57568359375,
                "y" : 3609.07958984375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "263",
                "Strength" : 4,
                "selected" : false,
                "cytoscape_alias_list" : [ "Fiscalini Bandage Cheddar" ],
                "canonicalName" : "Fiscalini Bandage Cheddar",
                "Milk" : "Raw cow's milk",
                "Quality" : 88,
                "Type" : "Hard",
                "SUID" : 263,
                "NodeType" : "Cheese",
                "name" : "Fiscalini Bandage Cheddar",
                "Country" : "US",
                "shared_name" : "Fiscalini Bandage Cheddar"
              },
              "position" : {
                "x" : 3464.85888671875,
                "y" : 3461.1014404296875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "262",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Grafton Cheddar" ],
                "canonicalName" : "Grafton Cheddar",
                "Milk" : "Raw cow's milk",
                "Quality" : 89,
                "Type" : "Hard",
                "SUID" : 262,
                "NodeType" : "Cheese",
                "name" : "Grafton Cheddar",
                "Country" : "US",
                "shared_name" : "Grafton Cheddar"
              },
              "position" : {
                "x" : 3166.817138671875,
                "y" : 3552.80126953125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "261",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Keen's Cheddar" ],
                "canonicalName" : "Keen's Cheddar",
                "Milk" : "Raw cow's milk",
                "Quality" : 97,
                "Type" : "Hard",
                "SUID" : 261,
                "NodeType" : "Cheese",
                "name" : "Keen's Cheddar",
                "Country" : "England",
                "shared_name" : "Keen's Cheddar"
              },
              "position" : {
                "x" : 3148.745849609375,
                "y" : 3631.0185546875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "260",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Lincolnshire Poacher" ],
                "canonicalName" : "Lincolnshire Poacher",
                "Milk" : "Raw cow's milk",
                "Quality" : 93,
                "Type" : "Hard",
                "SUID" : 260,
                "NodeType" : "Cheese",
                "name" : "Lincolnshire Poacher",
                "Country" : "England",
                "shared_name" : "Lincolnshire Poacher"
              },
              "position" : {
                "x" : 3321.765625,
                "y" : 3505.38916015625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "259",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Montgomery's Cheddar" ],
                "canonicalName" : "Montgomery's Cheddar",
                "Milk" : "Raw cow's milk",
                "Quality" : 98,
                "Type" : "Hard",
                "SUID" : 259,
                "NodeType" : "Cheese",
                "name" : "Montgomery's Cheddar",
                "Country" : "England",
                "shared_name" : "Montgomery's Cheddar"
              },
              "position" : {
                "x" : 3307.8323974609375,
                "y" : 3721.587646484375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "258",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Reade's Cheddar" ],
                "canonicalName" : "Reade's Cheddar",
                "Milk" : "Raw cow's milk",
                "Quality" : 92,
                "Type" : "Hard",
                "SUID" : 258,
                "NodeType" : "Cheese",
                "name" : "Reade's Cheddar",
                "Country" : "Scotland",
                "shared_name" : "Reade's Cheddar"
              },
              "position" : {
                "x" : 3201.61865234375,
                "y" : 3698.0750732421875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "257",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Westcombe Cheddar" ],
                "canonicalName" : "Westcombe Cheddar",
                "Milk" : "Raw cow's milk",
                "Quality" : 91,
                "Type" : "Hard",
                "SUID" : 257,
                "NodeType" : "Cheese",
                "name" : "Westcombe Cheddar",
                "Country" : "England",
                "shared_name" : "Westcombe Cheddar"
              },
              "position" : {
                "x" : 3384.05859375,
                "y" : 3637.2869873046875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "256",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Cheshire" ],
                "canonicalName" : "Cheshire",
                "Milk" : "Raw cow's milk",
                "Quality" : 84,
                "Type" : "Semi-hard",
                "SUID" : 256,
                "NodeType" : "Cheese",
                "name" : "Cheshire",
                "Country" : "England",
                "shared_name" : "Cheshire"
              },
              "position" : {
                "x" : 3870.85986328125,
                "y" : 3159.0245361328125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "255",
                "selected" : false,
                "cytoscape_alias_list" : [ "Double Gloucester" ],
                "canonicalName" : "Double Gloucester",
                "SUID" : 255,
                "NodeType" : "Cheese",
                "name" : "Double Gloucester",
                "shared_name" : "Double Gloucester"
              },
              "position" : {
                "x" : 3949.533447265625,
                "y" : 3136.4970703125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "254",
                "selected" : false,
                "cytoscape_alias_list" : [ "Pouilly Fume" ],
                "canonicalName" : "Pouilly Fume",
                "SUID" : 254,
                "NodeType" : "WhiteWine",
                "name" : "Pouilly Fume",
                "shared_name" : "Pouilly Fume"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 2303.0908203125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "253",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Chevrotin Des Aravis" ],
                "canonicalName" : "Chevrotin Des Aravis",
                "Milk" : "Raw goat's milk",
                "Quality" : 82,
                "Type" : "Soft",
                "SUID" : 253,
                "NodeType" : "Cheese",
                "name" : "Chevrotin Des Aravis",
                "Country" : "France",
                "shared_name" : "Chevrotin Des Aravis"
              },
              "position" : {
                "x" : 4289.064697265625,
                "y" : 4182.9296875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "252",
                "Strength" : 1,
                "selected" : false,
                "cytoscape_alias_list" : [ "Classic Blue" ],
                "canonicalName" : "Classic Blue",
                "Milk" : "Pasteurized goat's milk",
                "Quality" : 73,
                "Type" : "Semi-soft",
                "SUID" : 252,
                "NodeType" : "Cheese",
                "name" : "Classic Blue",
                "Country" : "US",
                "shared_name" : "Classic Blue"
              },
              "position" : {
                "x" : 5096.297119140625,
                "y" : 2981.12109375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "251",
                "Strength" : 6,
                "selected" : false,
                "cytoscape_alias_list" : [ "Monte Enebro" ],
                "canonicalName" : "Monte Enebro",
                "Milk" : "Pasteurized goat's milk",
                "Quality" : 95,
                "Type" : "Semi-soft",
                "SUID" : 251,
                "NodeType" : "Cheese",
                "name" : "Monte Enebro",
                "Country" : "Spain",
                "shared_name" : "Monte Enebro"
              },
              "position" : {
                "x" : 5000.210205078125,
                "y" : 3064.672607421875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "250",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Constant Bliss" ],
                "canonicalName" : "Constant Bliss",
                "Milk" : "Raw cow's milk",
                "Quality" : 74,
                "Type" : "Soft",
                "SUID" : 250,
                "NodeType" : "Cheese",
                "name" : "Constant Bliss",
                "Country" : "US",
                "shared_name" : "Constant Bliss"
              },
              "position" : {
                "x" : 4186.913330078125,
                "y" : 4547.84033203125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "249",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Coolea" ],
                "canonicalName" : "Coolea",
                "Milk" : "Cow's milk",
                "Quality" : 88,
                "Type" : "Semi-hard",
                "SUID" : 249,
                "NodeType" : "Cheese",
                "name" : "Coolea",
                "Country" : "Ireland",
                "shared_name" : "Coolea"
              },
              "position" : {
                "x" : 3206.84765625,
                "y" : 3944.9237060546875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "248",
                "Strength" : 6,
                "selected" : false,
                "cytoscape_alias_list" : [ "Gouda Boerenkaas" ],
                "canonicalName" : "Gouda Boerenkaas",
                "Milk" : "Cow's milk",
                "Quality" : 96,
                "Type" : "Semi-hard",
                "SUID" : 248,
                "NodeType" : "Cheese",
                "name" : "Gouda Boerenkaas",
                "Country" : "Holland",
                "shared_name" : "Gouda Boerenkaas"
              },
              "position" : {
                "x" : 3112.705322265625,
                "y" : 3936.4581298828125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "247",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Mimolette" ],
                "canonicalName" : "Mimolette",
                "Milk" : "Pasteurized cow's milk",
                "Quality" : 77,
                "Type" : "Semi-hard",
                "SUID" : 247,
                "NodeType" : "Cheese",
                "name" : "Mimolette",
                "Country" : "France",
                "shared_name" : "Mimolette"
              },
              "position" : {
                "x" : 3154.311767578125,
                "y" : 4042.9688720703125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "246",
                "selected" : false,
                "cytoscape_alias_list" : [ "Chilean Carmenere-Merlot blend" ],
                "canonicalName" : "Chilean Carmenere-Merlot blend",
                "SUID" : 246,
                "NodeType" : "RedWine",
                "name" : "Chilean Carmenere-Merlot blend",
                "shared_name" : "Chilean Carmenere-Merlot blend"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 3398.018798828125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "245",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Pouligny-Saint-Pierre" ],
                "canonicalName" : "Pouligny-Saint-Pierre",
                "Milk" : "Goat's milk",
                "Quality" : 90,
                "Type" : "Semi-soft",
                "SUID" : 245,
                "NodeType" : "Cheese",
                "name" : "Pouligny-Saint-Pierre",
                "Country" : "France",
                "shared_name" : "Pouligny-Saint-Pierre"
              },
              "position" : {
                "x" : 3809.524169921875,
                "y" : 2296.8134765625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "244",
                "selected" : false,
                "cytoscape_alias_list" : [ "Sancerrois" ],
                "canonicalName" : "Sancerrois",
                "SUID" : 244,
                "NodeType" : "Cheese",
                "name" : "Sancerrois",
                "shared_name" : "Sancerrois"
              },
              "position" : {
                "x" : 3736.044189453125,
                "y" : 2092.220703125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "243",
                "Strength" : 1,
                "selected" : false,
                "cytoscape_alias_list" : [ "Selles-sur-Cher" ],
                "canonicalName" : "Selles-sur-Cher",
                "Milk" : "Goat's milk",
                "Quality" : 89,
                "Type" : "Semi-soft",
                "SUID" : 243,
                "NodeType" : "Cheese",
                "name" : "Selles-sur-Cher",
                "Country" : "France",
                "shared_name" : "Selles-sur-Cher"
              },
              "position" : {
                "x" : 3921.0238037109375,
                "y" : 2303.1463623046875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "242",
                "Strength" : 1,
                "selected" : false,
                "cytoscape_alias_list" : [ "Valencay" ],
                "canonicalName" : "Valencay",
                "Milk" : "Goat's milk",
                "Quality" : 91,
                "Type" : "Semi-hard",
                "SUID" : 242,
                "NodeType" : "Cheese",
                "name" : "Valencay",
                "Country" : "France",
                "shared_name" : "Valencay"
              },
              "position" : {
                "x" : 3876.75146484375,
                "y" : 2236.268798828125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "241",
                "selected" : false,
                "cytoscape_alias_list" : [ "California Viognier" ],
                "canonicalName" : "California Viognier",
                "SUID" : 241,
                "NodeType" : "WhiteWine",
                "name" : "California Viognier",
                "shared_name" : "California Viognier"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 4695.8564453125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "240",
                "selected" : false,
                "cytoscape_alias_list" : [ "Zierfandler" ],
                "canonicalName" : "Zierfandler",
                "SUID" : 240,
                "NodeType" : "WhiteWine",
                "name" : "Zierfandler",
                "shared_name" : "Zierfandler"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 3320.015869140625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "239",
                "Strength" : 5,
                "selected" : false,
                "cytoscape_alias_list" : [ "Doddington" ],
                "canonicalName" : "Doddington",
                "Milk" : "Raw cow's milk",
                "Quality" : 92,
                "Type" : "Hard",
                "SUID" : 239,
                "NodeType" : "Cheese",
                "name" : "Doddington",
                "Country" : "England",
                "shared_name" : "Doddington"
              },
              "position" : {
                "x" : 3174.11474609375,
                "y" : 3818.884033203125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "238",
                "selected" : false,
                "cytoscape_alias_list" : [ "Saint Nectaire" ],
                "canonicalName" : "Saint Nectaire",
                "SUID" : 238,
                "NodeType" : "Cheese",
                "name" : "Saint Nectaire",
                "shared_name" : "Saint Nectaire"
              },
              "position" : {
                "x" : 4588.435546875,
                "y" : 3885.241943359375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "237",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Tomme de Savoie" ],
                "canonicalName" : "Tomme de Savoie",
                "Milk" : "Raw cow's milk",
                "Quality" : 82,
                "Type" : "Semi-hard",
                "SUID" : 237,
                "NodeType" : "Cheese",
                "name" : "Tomme de Savoie",
                "Country" : "France",
                "shared_name" : "Tomme de Savoie"
              },
              "position" : {
                "x" : 4623.97705078125,
                "y" : 3775.518798828125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "236",
                "selected" : false,
                "cytoscape_alias_list" : [ "German Riesling Auslese" ],
                "canonicalName" : "German Riesling Auslese",
                "SUID" : 236,
                "NodeType" : "WhiteWine",
                "name" : "German Riesling Auslese",
                "shared_name" : "German Riesling Auslese"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 3619.111572265625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "235",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Epoisses de Bourgogne" ],
                "canonicalName" : "Epoisses de Bourgogne",
                "Milk" : "Cow's milk",
                "Quality" : 90,
                "Type" : "Soft",
                "SUID" : 235,
                "NodeType" : "Cheese",
                "name" : "Epoisses de Bourgogne",
                "Country" : "France",
                "shared_name" : "Epoisses de Bourgogne"
              },
              "position" : {
                "x" : 4656.1279296875,
                "y" : 4349.205078125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "234",
                "Strength" : 4,
                "selected" : false,
                "cytoscape_alias_list" : [ "L'Ami du Chambertin" ],
                "canonicalName" : "L'Ami du Chambertin",
                "Milk" : "Raw cow's milk",
                "Quality" : 89,
                "Type" : "Soft",
                "SUID" : 234,
                "NodeType" : "Cheese",
                "name" : "L'Ami du Chambertin",
                "Country" : "France",
                "shared_name" : "L'Ami du Chambertin"
              },
              "position" : {
                "x" : 4539.239501953125,
                "y" : 4390.535400390625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "233",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Evora" ],
                "canonicalName" : "Evora",
                "Milk" : "Raw sheep's milk",
                "Synonym" : "Queijo Evora",
                "Quality" : 84,
                "Type" : "Semi-hard",
                "SUID" : 233,
                "NodeType" : "Cheese",
                "name" : "Evora",
                "Country" : "Portugal",
                "shared_name" : "Evora"
              },
              "position" : {
                "x" : 5018.212890625,
                "y" : 4910.54541015625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "232",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Fiumorbu Brebis" ],
                "canonicalName" : "Fiumorbu Brebis",
                "Milk" : "Raw sheep's milk",
                "Quality" : 84,
                "Type" : "Semi-hard",
                "SUID" : 232,
                "NodeType" : "Cheese",
                "name" : "Fiumorbu Brebis",
                "Country" : "France",
                "shared_name" : "Fiumorbu Brebis"
              },
              "position" : {
                "x" : 4848.2529296875,
                "y" : 4157.01904296875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "231",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Stanser Schafkase" ],
                "canonicalName" : "Stanser Schafkase",
                "Milk" : "Raw sheep's milk",
                "Quality" : 93,
                "Type" : "Semi-hard",
                "SUID" : 231,
                "NodeType" : "Cheese",
                "name" : "Stanser Schafkase",
                "Country" : "Switzerland",
                "shared_name" : "Stanser Schafkase"
              },
              "position" : {
                "x" : 4862.225830078125,
                "y" : 4292.223876953125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "230",
                "selected" : false,
                "cytoscape_alias_list" : [ "Alsatian Pinot Gris" ],
                "canonicalName" : "Alsatian Pinot Gris",
                "SUID" : 230,
                "NodeType" : "WhiteWine",
                "name" : "Alsatian Pinot Gris",
                "shared_name" : "Alsatian Pinot Gris"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 3918.207275390625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "229",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Flixer" ],
                "canonicalName" : "Flixer",
                "Milk" : "Raw sheep's milk",
                "Quality" : 91,
                "Type" : "Hard",
                "SUID" : 229,
                "NodeType" : "Cheese",
                "name" : "Flixer",
                "Country" : "Switzerland",
                "shared_name" : "Flixer"
              },
              "position" : {
                "x" : 4961.910400390625,
                "y" : 4458.98486328125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "228",
                "Strength" : 3,
                "selected" : false,
                "cytoscape_alias_list" : [ "Ossau-Iraty Brebis" ],
                "canonicalName" : "Ossau-Iraty Brebis",
                "Milk" : "Sheep's milk",
                "Quality" : 87,
                "Type" : "Hard",
                "SUID" : 228,
                "NodeType" : "Cheese",
                "name" : "Ossau-Iraty Brebis",
                "Country" : "France",
                "shared_name" : "Ossau-Iraty Brebis"
              },
              "position" : {
                "x" : 5099.501953125,
                "y" : 4629.721435546875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "227",
                "selected" : false,
                "cytoscape_alias_list" : [ "Sicilian Chardonnay" ],
                "canonicalName" : "Sicilian Chardonnay",
                "SUID" : 227,
                "NodeType" : "WhiteWine",
                "name" : "Sicilian Chardonnay",
                "shared_name" : "Sicilian Chardonnay"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 2243.271484375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "226",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Foin d'Odeur" ],
                "canonicalName" : "Foin d'Odeur",
                "Milk" : "Pasteurized sheep's milk",
                "Quality" : 72,
                "Type" : "Semi-soft",
                "SUID" : 226,
                "NodeType" : "Cheese",
                "name" : "Foin d'Odeur",
                "Country" : "Canada",
                "shared_name" : "Foin d'Odeur"
              },
              "position" : {
                "x" : 4785.431884765625,
                "y" : 4031.3193359375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "225",
                "selected" : false,
                "cytoscape_alias_list" : [ "Innerschweizer Schafkase" ],
                "canonicalName" : "Innerschweizer Schafkase",
                "SUID" : 225,
                "NodeType" : "Cheese",
                "name" : "Innerschweizer Schafkase",
                "shared_name" : "Innerschweizer Schafkase"
              },
              "position" : {
                "x" : 4674.8583984375,
                "y" : 3939.35205078125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "224",
                "selected" : false,
                "cytoscape_alias_list" : [ "Brunello di Montalcino" ],
                "canonicalName" : "Brunello di Montalcino",
                "SUID" : 224,
                "NodeType" : "RedWine",
                "name" : "Brunello di Montalcino",
                "shared_name" : "Brunello di Montalcino"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 4567.8076171875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "223",
                "selected" : false,
                "cytoscape_alias_list" : [ "Salice Salentino" ],
                "canonicalName" : "Salice Salentino",
                "SUID" : 223,
                "NodeType" : "RedWine",
                "name" : "Salice Salentino",
                "shared_name" : "Salice Salentino"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 2764.383056640625
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "222",
                "selected" : false,
                "cytoscape_alias_list" : [ "Minervois" ],
                "canonicalName" : "Minervois",
                "SUID" : 222,
                "NodeType" : "RedWine",
                "name" : "Minervois",
                "shared_name" : "Minervois"
              },
              "position" : {
                "x" : 1391.108154296875,
                "y" : 2715.64208984375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "221",
                "selected" : false,
                "cytoscape_alias_list" : [ "California Pinot Blanc" ],
                "canonicalName" : "California Pinot Blanc",
                "SUID" : 221,
                "NodeType" : "WhiteWine",
                "name" : "California Pinot Blanc",
                "shared_name" : "California Pinot Blanc"
              },
              "position" : {
                "x" : 6593.2421875,
                "y" : 4636.037109375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "220",
                "Strength" : 2,
                "selected" : false,
                "cytoscape_alias_list" : [ "Fougerus" ],
                "canonicalName" : "Fougerus",
                "Milk" : "Cow's milk",
                "Quality" : 76,
                "Type" : "Soft",
                "SUID" : 220,
                "NodeType" : "Cheese",
                "name" : "Fougerus",
                "Country" : "France",
                "shared_name" : "Fougerus"
              },
              "position" : {
                "x" : 3984.2945556640625,
                "y" : 4429.928466796875
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "219",
                "Strength" : 1,
                "selected" : false,
                "cytoscape_alias_list" : [ "Brillat-Savarin" ],
                "canonicalName" : "Brillat-Savarin",
                "Milk" : "Cow's milk",
                "Quality" : 81,
                "Type" : "Soft",
                "SUID" : 219,
                "NodeType" : "Cheese",
                "name" : "Brillat-Savarin",
                "Country" : "France",
                "shared_name" : "Brillat-Savarin"
              },
              "position" : {
                "x" : 4125.33349609375,
                "y" : 4470.12109375
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "218",
                "Strength" : 1,
                "selected" : false,
                "cytoscape_alias_list" : [ "Pierre-Robert" ],
                "canonicalName" : "Pierre-Robert",
                "Milk" : "Cow's milk",
                "Quality" : 79,
                "Type" : "Soft",
                "SUID" : 218,
                "NodeType" : "Cheese",
                "name" : "Pierre-Robert",
                "Country" : "France",
                "shared_name" : "Pierre-Robert"
              },
              "position" : {
                "x" : 3848.942138671875,
                "y" : 4446.759033203125
              },
              "selected" : false
            }, {
              "data" : {
                "id" : "217",
                "selected" : false,
                "cytoscape_alias_list" : [ "Blu de Moncenisio" ],
                "canonicalName" : "Blu de Moncenisio",
                "SUID" : 217,
                "NodeType" : "Cheese",
                "name" : "Blu de Moncenisio",
                "shared_name" : "Blu de Moncenisio"
              },
              "position" : {
                "x" : 4334.609375,
                "y" : 3097.58056640625
              },
              "selected" : false
            }
        ]
        const elements2 = [ // list of graph elements to start with
            { // node a
              data: { id: 'a' }
            },
            { // node b
              data: { id: 'b' }
            },
            { // edge ab
              data: { id: 'ab', source: 'a', target: 'b' }
            }
        ]
        graph = cytoscape({
            container: divRef.current, // container to render in
            elements: elements,        
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                    'background-color': '#666',
                    'label': 'data(id)'
                    }
                },
            
                {
                    selector: 'edge',
                    style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                    }
                }
            ],            
            layout: {
            name: 'grid',
            rows: 1
            }
        }).on('cxttap', function(event) {
            if (allSelected('node')) {
              contextMenu.hideMenuItem('select-all-nodes');
              contextMenu.showMenuItem('unselect-all-nodes');
            }
            else {
              contextMenu.hideMenuItem('unselect-all-nodes');
              contextMenu.showMenuItem('select-all-nodes');
            }
            if (allSelected('edge')) {
              contextMenu.hideMenuItem('select-all-edges');
              contextMenu.showMenuItem('unselect-all-edges');
            }
            else {
              contextMenu.hideMenuItem('unselect-all-edges');
              contextMenu.showMenuItem('select-all-edges');
            }
          });     
        graph.renderer().data.canvases.forEach((canvas: HTMLCanvasElement)=> {
            canvas.style.left = "0px";
            canvas.style.top = "0px";
            graph.fit();
        })         
        graph.on('resize', (event: any)=>{            
            graph.fit();
        })
        const allSelected = function (type: any) {
            if (type == 'node') {
              return graph.nodes().length == graph.nodes(':selected').length;
            }
            else if (type == 'edge') {
              return graph.edges().length == graph.edges(':selected').length;
            }
            return false;
          }
  
          const selectAllOfTheSameType = function (type: any) {
            if (type == 'node') {
                graph.nodes().select();
            } else if (type == 'edge') {
                graph.edges().select();
            }
          };
          const unselectAllOfTheSameType = function (type: any) {
            if (type == 'node') {
                graph.nodes().unselect();
              ;
            } else if (type == 'edge') {
                graph.edges().unselect();
            }
          };
        const contextMenu = graph.contextMenus({
            menuItems: [
              {
                id: 'remove',
                content: 'remove',
                tooltipText: 'remove',
                image: {src: "assets/remove.svg", width: 12, height: 12, x: 6, y: 4},
                selector: 'node, edge',
                onClickFunction: function (event: any) {
                  var target = event.target || event.cyTarget;
                //   removed = target.remove();
  
                  contextMenu.showMenuItem('undo-last-remove');
                },
                hasTrailingDivider: true
              },
              {
                id: 'undo-last-remove',
                content: 'undo last remove',
                selector: 'node, edge',
                show: false,
                coreAsWell: true,
                onClickFunction: function (event: any) {
                //   if (removed) {
                //     removed.restore();
                //   }
                  contextMenu.hideMenuItem('undo-last-remove');
                },
                hasTrailingDivider: true
              },
              {
                id: 'color',
                content: 'change color',
                tooltipText: 'change color',
                selector: 'node',
                hasTrailingDivider: true,
                submenu: [
                  {
                    id: 'color-blue',
                    content: 'blue',
                    tooltipText: 'blue',
                    onClickFunction: function (event: any) {
                      let target = event.target || event.cyTarget;
                      target.style('background-color', 'blue');
                    },
                    submenu: [
                      {
                        id: 'color-light-blue',
                        content: 'light blue',
                        tooltipText: 'light blue',
                        onClickFunction: function (event: any) {
                          let target = event.target || event.cyTarget;
                          target.style('background-color', 'lightblue');
                        },
                      },
                      {
                        id: 'color-dark-blue',
                        content: 'dark blue',
                        tooltipText: 'dark blue',
                        onClickFunction: function (event: any) {
                          let target = event.target || event.cyTarget;
                          target.style('background-color', 'darkblue');
                        },
                      },
                    ],
                  },
                  {
                    id: 'color-green',
                    content: 'green',
                    tooltipText: 'green',
                    onClickFunction: function (event: any) {
                      let target = event.target || event.cyTarget;
                      target.style('background-color', 'green');
                    },
                  },
                  {
                    id: 'color-red',
                    content: 'red',
                    tooltipText: 'red',
                    onClickFunction: function (event: any) {
                      let target = event.target || event.cyTarget;
                      target.style('background-color', 'red');
                    },
                  },
                ]
              },
              {
                id: 'add-node',
                content: 'add node',
                tooltipText: 'add node',
                image: {src: "assets/add.svg", width: 12, height: 12, x: 6, y: 4},
                coreAsWell: true,
                onClickFunction: function (event: any) {
                  var data = {
                    group: 'nodes'
                  };
  
                  var pos = event.position || event.cyPosition;
  
                  graph.add({
                    data: data,
                    position: {
                      x: pos.x,
                      y: pos.y
                    }
                  });
                }
              },
              {
                id: 'select-all-nodes',
                content: 'select all nodes',
                selector: 'node',
                coreAsWell: true,
                show: true,
                onClickFunction: function (event: any) {
                  selectAllOfTheSameType('node');
  
                  contextMenu.hideMenuItem('select-all-nodes');
                  contextMenu.showMenuItem('unselect-all-nodes');
                }
              },
              {
                id: 'unselect-all-nodes',
                content: 'unselect all nodes',
                selector: 'node',
                coreAsWell: true,
                show: false,
                onClickFunction: function (event: any) {
                  unselectAllOfTheSameType('node');
  
                  contextMenu.showMenuItem('select-all-nodes');
                  contextMenu.hideMenuItem('unselect-all-nodes');
                }
              },
              {
                id: 'select-all-edges',
                content: 'select all edges',
                selector: 'edge',
                coreAsWell: true,
                show: true,
                onClickFunction: function (event: any) {
                  selectAllOfTheSameType('edge');
  
                  contextMenu.hideMenuItem('select-all-edges');
                  contextMenu.showMenuItem('unselect-all-edges');
                }
              },
              {
                id: 'unselect-all-edges',
                content: 'unselect all edges',
                selector: 'edge',
                coreAsWell: true,
                show: false,
                onClickFunction: function (event: any) {
                  unselectAllOfTheSameType('edge');
  
                  contextMenu.showMenuItem('select-all-edges');
                  contextMenu.hideMenuItem('unselect-all-edges');
                }
              }
            ]
          });

        return ()=> graph.destroy();
    }, []);

    return(
        <div ref={divRef} style={{height: "100%"}}>

        </div>
    )
}

export default DiagramComponent;