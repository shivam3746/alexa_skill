// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const facts = [
	"Africa is the only continent that is in all four hemispheres: north, south, west, and east. It’s therefore also the only continent to have land on the prime meridian and the equator.",
	"Alaska is the westernmost and northernmost state in the United States, which makes a lot of sense when you look at a map. But more surprisingly, the state manages to be the easternmost state as well. Parts of Alaska are so far west that the state actually stretches into the eastern hemisphere. Longitude lines converge at the top and bottom of the globe, so Pochoni Point, Alaska, has the easternmost longitude of any point in the country.",
	"Lesotho, San Marino, and Vatican City are the only countries to be surrounded by just one other country. Lesotho is landlocked within South Africa while San Marino and Vatican City are surrounded by Italy.",
	"Even when looking at a map, this fact is hard to wrap your head around. Despite being in Nevada (and nearly 300 miles from the ocean), Reno is roughly 86 miles farther west than the coastal city Los Angeles.",
	"Canada is the second largest country in the world, so it may not come as a surprise that it has a lot of lakes. But it might shock you that the country has more than half of all the natural lakes in the world. An impressive nine percent of the country is covered in fresh water.",
	"If the entire world were as densely populated as New York City, the whole population would only cover 250,404 square miles. That means the entire world could fit into the state of Texas. For comparison, if the world had the same population density as Houston, Texas, it would cover 1,769,085 square miles. Even then, being able to hypothetically fit over 7 billion people in an area smaller than half the United States is pretty impressive.",
	"Being its own continent and completely surrounded by water, you’d think Australia would easily have the honor of being the country with the longest coastline. However, that title goes to Canada. Canada has 152,100 miles of coastline, compared to Australia’s measly 16,000 miles. In fact, Australia ranks seventh on the list of the world’s longest coastlines, coming in behind Indonesia, Greenland, Russia, Philippines, and Japan.",
	"Mount Everest is the tallest mountain on Earth, so it would stand to reason that the top of the mountain would be the highest point on Earth (and therefore closest to space). But when you remember that Earth is slightly oval-shaped, things get interesting. Our planet is slightly inflated around the equator, meaning countries like Ecuador and Kenya have a bit of an edge. With this added elevation, the top of Ecuador’s Mount Chimborazo (which is only 20,564 feet tall) is closest to the stars.",
	"At 14 million square kilometers (about 5,400,000 square miles), the ice sheet in Antarctica is the largest solid ice mass on the planet. The enormous frozen structure contains about 90 percent of all the fresh water on Earth.",
	"Although China is just a little more than half the size of Russia—the largest country in the world—they share the same number of land neighbors. The 14 countries bordering China are: India, Pakistan, Afghanistan, Tajikistan, Kyrgyzstan, Kazakhstan, Mongolia, Russia, North Korea, Vietnam, Laos, Myanmar, Bhutan, and Nepal.",
	"Continents shift at about the same rate as your fingernails grow.",
	"Ninety percent of Earth's population lives in the Northern Hemisphere.",
	"California has more people than all of Canada.",
	"Australia is wider than the moon.",
	"In the Philippines, there’s an island that’s within a lake, on an island that’s within a lake, on an island.",
	"The Dead Sea is currently 429 meters below sea level and sinking about 1 meter a year.",
	"At certain times of the year you could walk from the United States to Russia because of two islands known as Big (Russian) and Little (U.S.) Diomede.",
	"Mount Everest, the world’s tallest mountain, can fit inside the Marianas Trench, the deepest part of the ocean.",
	"Russia spans 11 time zones.",
	"Vatican City is the smallest country in the world.",
	"Iceland, divided by the North American and European tectonic plates, is growing by nearly 5 centimeters per year as the plates grow wider apart.",
	"As North America and South America are move more westward, the Pacific Ocean is shrinking. Every year, Asia and North America get closer and closer as the Pacific is reduced by two to three centimeters.",
	"California is west of Nevada, but check the map closely and you'll see the City of Angels is actually 86 miles east of Reno. This is particularly mind-boggling when you consider Nevada is close to 300 miles from the Pacific Ocean.",
	"The San Andreas fault in California is \"consuming\" nearly 2 inches of land each year. If humans are still around in 15 million years, those living in Las Angeles and San Francisco can be neighbors.",
	"The Archipelago of the Philippines is made up of 7,641 islands — several hundred more than the 7,107 islands scientists previously believed the country contained.",
	"The only sea in the world without any coasts, the Sargasso Sea is found in the Atlantic Ocean. Located in the North, it is surrounded by four ocean currents, with no land coastline to speak of. It is named for the floating seaweed that covers it: Sargassum.",
	"Beneath Yellowstone National Park lies an active \"supervolcano\" — a distinction bestowed upon volcanoes that have seen at least one explosion release more than 240 cubic miles of material (a bit more than twice the volume of Lake Erie, according to National Geographic).",
	"Egypt's Pyramids of Giza may be considered one of the wonders of the world, but Sudan has nearly twice the number of pyramids. Sudan touts 200-255 known pyramids, built for the Kushite kingdoms of Nubia, compared to Egypt's relatively paltry 138 pyramids.",
	"Despite its name, Mount Augustus is not a mountain, but one very large rock. Located in the Australian Outback, the rock stands more than 2,300 feet tall and can be seen from nearly 100 miles.",
	"You may have thought Jerusalem or Athens was the oldest city in the world, but that honor goes to Damascus, Syria. Continuously inhabited since at least 11,000 years ago, it was named the Arab Capital of Culture in 2008. Damascus has more than 125 monuments showcasing its different periods of history since the 3rd millennium B.C., including the Great Mosque of the Umayyads, built in the 8th century. Today, the city is home to 1.7 million people.",
	"Kentucky's cave system, Mammoth Cave, is nearly 400 miles in length — and that's just what's been explored! Scientists think there are 200 more miles of unexplored caves, making the cave system the largest on Earth.",
	"Istanbul is located in both Europe and Asia, with the Bosphorus Strait running through its middle. You can cross the Bosporus Bridge between the two sides, with the more populated European side serving as the commercial and historical center.",
	"New York and Los Angeles may be more populated than any town in Alaska, but based on land mass, Alaska is home to some of the largest cities in the United States. Sitka, Alaska, may only have little more than 10,000 residents, but the city spans more than 2,800 square miles (New York City, as a point of comparison, is just 302 square miles). Juneau, with more than 31,000 people, sits on 2,700 square miles. Tiny Wrangell, Alaska, with just over 2,300 residents, spreads across more than 2,500 square miles. And Anchorage, at 1,704 square miles, has 301,000 inhabitants.",
	"The Northern Hemisphere is home to 90 percent of the Earth's total population. The Earth is home to 7.3 billion people, yet 6.57 billion live north of the equator in North America, Europe, most of Africa and Asia and even some parts of South America.",
	"The Mariana Trench in the Pacific Ocean is the deepest place on the surface of Earth, with a small depression called the Challenger Deep the deepest part of the trench. The depression reaches depths of nearly 35,814 feet.",
	"If you want to take the train across Russia, you'll need to set aside seven days for a direct route that doesn't stop, crossing through all 11 time zones. The railway crosses Russia's 16 largest rivers, including the Volga, as well as an astonishing 3,901 bridges along 62 miles of bridgework.",
	"With temperatures reaching up to 136 degrees Fahrenheit, Northern Africa's Sahara Desert rarely gets cold enough for snow. But it is not unheard of! The Sahara's temp averages 86 degrees, but in the evenings, chill sets in, averaging 55 degrees. In January 2018, the Sahara received its third snow in 40 years— before that, snowfall was recorded in 2016 and 1979.",
	"The Great Barrier Reef, which spans 1,429 miles along the coastline of Australia, is home to a reef in the shape of a heart — and it's very visible from above! In fact, a pilot first spotted the heart when he flew overhead in 1975. Just 55 feet in diameter, the reef is a part of Hardy Reef in Whitsundays. Alas, you cannot visit by boat, as the reef is highly protected.",
	"Nine percent of Canada is a freshwater lake, and with 31,752 lakes, the country has more lakes than anywhere else in the world. These lakes are impressive in scope, too; 561 of Canada's lakes measure more than 62 square miles.",
	"New York City is known for its staggering skyscrapers — and some are so epic, they have their own zip codes! The Empire State Building, MetLife Building, the Woolworth Building and the Chrysler Building are some of the buildings to boast this distinction.",
	"Between the United States and Russia are the Diomede Islands. The two countries divide the islands, with Bio Diomede located in Russia and Little Diomede in America, separated by the International Border and Date Line. Because of this, although the islands are just 2.4 miles apart, there's a 20-hour time difference between them. This unique trait is why Big Diomede is called Tomorrow Island and Little Diomede is called Yesterday Island.",
	"The Gold Rush is over, but perhaps it shouldn't be. There is enough gold in the core of the planet to cover the whole of Earth with a 1.5-foot layer of the mineral.",
	"The North Pole is not made of land. Instead, it is made up of polar ice caps — floating icebergs. If Santa is real, his home is floating.",
	"Seventy-one percent of the Earth is made up of water, yet only .007 percent of it can be used by humans. Only 2.5 percent is freshwater; the rest is saline and ocean-based. Moreover, of this freshwater, only 1 percent is readily accessible, with the rest trapped in glaciers and snowfields.",
	"California may have a long coastline, but it doesn't come close to Alaska's; in fact, more than half of the entire country's coastline is located in Alaska.",
	"Just how important is the Amazon Rainforest in South America? Consider this: More than 20 percent of Earth's oxygen supply is produced by the forest.",
	"It takes a drop of water three months to travel the Mississippi River, the longest in the United States at 2,348 miles. Drop the water at its northernmost source in Minnesota and it won't reach the end, the Gulf of Mexico, for 90 days.",
	"The Greek national anthem consists of 158 verses. It is not known if there is a Greek who can sing them all by heart.",
	"The shortest place name in the world is Å. Villages with this name can be found both in Norway and Sweden. In the Scandinavian languages “Å” means “River”.",
	"New York drifts away from London 1 inch/2,5 cm every year.",
	"The Himalayas are getting higher 0,6 inch/1,5 cm every year.",
	"The name of Canada comes from the St. Lawrence Iroquoian word kanata or canada, meaning village or settlement.",
	"It’s forbidden for airplanes to fly over the Taj Mahal.",
	"Mexico City sinks 4-6 inches (10-15 cm) a year because it was built over a lake. The city has sunk around 32 feet/10 m in the last 60 years.",
	"The first city to reach 1 million inhabitants was Rome in 133 BC. London reached the line in 1810, New York – in 1875. Nowadays more than 300 cities in the world have more than a million inhabitants.",
	"If a man gives a woman a compliment in Togo, he should marry her.",
	"On the 18th of February 1979 it was snowing in the Sahara.",
	"There were 87,504 governmental units in the United States as of June 1997. In addition to the Federal Government and the 50 state governments, there were 87,453 units of local government. Of these, 39,044 are general purpose local governments - 3,043 county governments and 36,001 subcounty general purpose governments, including 13,726 school distict governments and 34,683 special district governments.",
	"When you picture a desert, you probably imagine lots of sun and sand. But the definition of a desert is really just an area of land that doesn't get more than 10 inches of precipitation a year. With that definition in mind, the world's largest desert is Antarctica. The Antarctic Polar Desert covers 5.5 million square miles, and its water is mostly locked in glaciers and ice sheets, leaving little for plants and animals.",
	"The Appalachian mountains used to be as tall as the Rockies but are shrinking... meanwhile the Himalayan mountains used to be the size of the Rockies and are growing."
];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to geo buddy. Do you want to listen one fun fact?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .withSimpleCard("Welcome to Geo Buddy!","Do you want to hear a fact?")
            .getResponse();
    }
};

function randomIndex(a,b){
    return (Math.random()*(b-a)+a)
}


const TellMeAFactHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const currentFact = facts[Math.floor(randomIndex(1,facts.length))-1]
        const speakOutput = currentFact + 'Do you want me to say another fact?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard("Geographical Fact",currentFact)
            .reprompt('You can say "Yes" if you want to hear another fun fact.')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const NoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Alright! I will be travelling around the world hunting for more facts. See you super soon.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard("Geographical Facts!","See you later")
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        TellMeAFactHandler,
        NoIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
