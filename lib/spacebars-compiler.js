//https://github.com/meteor/meteor/tree/devel/packages/spacebars-compiler

//https://github.com/meteor/meteor/blob/devel/packages/spacebars-compiler/tokens.js
(function() {
  // Adapted from source code of http://xregexp.com/plugins/#unicode
  var unicodeCategories = {
    Ll: "0061-007A00B500DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F05210523052505270561-05871D00-1D2B1D6B-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7B2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2CF32D00-2D252D272D2DA641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA661A663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CA78EA791A793A7A1A7A3A7A5A7A7A7A9A7FAFB00-FB06FB13-FB17FF41-FF5A",
    Lm: "02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D6A1D781D9B-1DBF2071207F2090-209C2C7C2C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A7F8A7F9A9CFAA70AADDAAF3AAF4FF70FF9EFF9F",
    Lo: "00AA00BA01BB01C0-01C3029405D0-05EA05F0-05F20620-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150840-085808A008A2-08AC0904-0939093D09500958-09610972-09770979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10CF10CF20D05-0D0C0D0E-0D100D12-0D3A0D3D0D4E0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC-0EDF0F000F40-0F470F49-0F6C0F88-0F8C1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA10FD-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1BBA-1BE51C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF11CF51CF62135-21382D30-2D672D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31BA31F0-31FF3400-4DB54E00-9FCCA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCAAE0-AAEAAAF2AB01-AB06AB09-AB0EAB11-AB16AB20-AB26AB28-AB2EABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
    Lt: "01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC",
    Lu: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E05200522052405260531-055610A0-10C510C710CD1E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CED2CF2A640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA660A662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BA78DA790A792A7A0A7A2A7A4A7A6A7A8A7AAFF21-FF3A",
    Mc: "0903093B093E-09400949-094C094E094F0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1BAC1BAD1BE71BEA-1BEC1BEE1BF21BF31C24-1C2B1C341C351CE11CF21CF3302E302FA823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BAAEBAAEEAAEFAAF5ABE3ABE4ABE6ABE7ABE9ABEAABEC",
    Mn: "0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065F067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0859-085B08E4-08FE0900-0902093A093C0941-0948094D0951-095709620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F8D-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135D-135F1712-17141732-1734175217531772177317B417B517B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91BAB1BE61BE81BE91BED1BEF-1BF11C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1CF41DC0-1DE61DFC-1DFF20D0-20DC20E120E5-20F02CEF-2CF12D7F2DE0-2DFF302A-302D3099309AA66FA674-A67DA69FA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1AAECAAEDAAF6ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26",
    Nd: "0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19D91A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
    Nl: "16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF",
    Pc: "005F203F20402054FE33FE34FE4D-FE4FFF3F"
  };

  var unicodeClass = function (abbrev) {
    return '[' +
      unicodeCategories[abbrev].replace(/[0-9A-F]{4}/ig, "\\u$&") + ']';
  };

  // See ECMA-262 spec, 3rd edition, Section 7.6
  // Match one or more characters that can start an identifier.
  // This is IdentifierStart+.
  var rIdentifierPrefix = new RegExp(
    "^([a-zA-Z$_]+|\\\\u[0-9a-fA-F]{4}|" +
      [unicodeClass('Lu'), unicodeClass('Ll'), unicodeClass('Lt'),
       unicodeClass('Lm'), unicodeClass('Lo'), unicodeClass('Nl')].join('|') +
      ")+");
  // Match one or more characters that can continue an identifier.
  // This is (IdentifierPart and not IdentifierStart)+.
  // To match a full identifier, match rIdentifierPrefix, then
  // match rIdentifierMiddle followed by rIdentifierPrefix until they both fail.
  var rIdentifierMiddle = new RegExp(
    "^([0-9]|" + [unicodeClass('Mn'), unicodeClass('Mc'), unicodeClass('Nd'),
                  unicodeClass('Pc')].join('|') + ")+");


  // See ECMA-262 spec, 3rd edition, Section 7.8.3
  var rHexLiteral = /^0[xX][0-9a-fA-F]+(?!\w)/;
  var rDecLiteral =
        /^(((0|[1-9][0-9]*)(\.[0-9]*)?)|\.[0-9]+)([Ee][+-]?[0-9]+)?(?!\w)/;

  // Section 7.8.4
  var rStringQuote = /^["']/;
  // Match one or more characters besides quotes, backslashes, or line ends
  var rStringMiddle = /^(?=.)[^"'\\]+?((?!.)|(?=["'\\]))/;
  // Match one escape sequence, including the backslash.
  var rEscapeSequence =
        /^\\(['"\\bfnrtv]|0(?![0-9])|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|(?=.)[^ux0-9])/;
  // Match one ES5 line continuation
  var rLineContinuation =
        /^\\(\r\n|[\u000A\u000D\u2028\u2029])/;


  parseNumber = function (scanner) {
    var startPos = scanner.pos;

    var isNegative = false;
    if (scanner.peek() === '-') {
      scanner.pos++;
      isNegative = true;
    }
    // Note that we allow `"-0xa"`, unlike `Number(...)`.

    var rest = scanner.rest();
    var match = rDecLiteral.exec(rest) || rHexLiteral.exec(rest);
    if (! match) {
      scanner.pos = startPos;
      return null;
    }
    var matchText = match[0];
    scanner.pos += matchText.length;

    var text = (isNegative ? '-' : '') + matchText;
    var value = Number(matchText);
    value = (isNegative ? -value : value);
    return { text: text, value: value };
  };

  parseIdentifierName = function (scanner) {
    var startPos = scanner.pos;
    var rest = scanner.rest();
    var match = rIdentifierPrefix.exec(rest);
    if (! match)
      return null;
    scanner.pos += match[0].length;
    rest = scanner.rest();
    var foundMore = true;

    while (foundMore) {
      foundMore = false;

      match = rIdentifierMiddle.exec(rest);
      if (match) {
        foundMore = true;
        scanner.pos += match[0].length;
        rest = scanner.rest();
      }

      match = rIdentifierPrefix.exec(rest);
      if (match) {
        foundMore = true;
        scanner.pos += match[0].length;
        rest = scanner.rest();
      }
    }

    return scanner.input.substring(startPos, scanner.pos);
  };

  parseStringLiteral = function (scanner) {
    var startPos = scanner.pos;
    var rest = scanner.rest();
    var match = rStringQuote.exec(rest);
    if (! match)
      return null;

    var quote = match[0];
    scanner.pos++;
    rest = scanner.rest();

    var jsonLiteral = '"';

    while (match) {
      match = rStringMiddle.exec(rest);
      if (match) {
        jsonLiteral += match[0];
      } else {
        match = rEscapeSequence.exec(rest);
        if (match) {
          var esc = match[0];
          // Convert all string escapes to JSON-compatible string escapes, so we
          // can use JSON.parse for some of the work.  JSON strings are not the
          // same as JS strings.  They don't support `\0`, `\v`, `\'`, or hex
          // escapes.
          if (esc === '\\0')
            jsonLiteral += '\\u0000';
          else if (esc === '\\v')
            // Note: IE 8 doesn't correctly parse '\v' in JavaScript.
            jsonLiteral += '\\u000b';
          else if (esc.charAt(1) === 'x')
            jsonLiteral += '\\u00' + esc.slice(2);
          else if (esc === '\\\'')
            jsonLiteral += "'";
          else
            jsonLiteral += esc;
        } else {
          match = rLineContinuation.exec(rest);
          if (! match) {
            match = rStringQuote.exec(rest);
            if (match) {
              var c = match[0];
              if (c !== quote) {
                if (c === '"')
                  jsonLiteral += '\\';
                jsonLiteral += c;
              }
            }
          }
        }
      }
      if (match) {
        scanner.pos += match[0].length;
        rest = scanner.rest();
        if (match[0] === quote)
          break;
      }
    }

    if (match[0] !== quote)
      scanner.fatal("Unterminated string literal");

    jsonLiteral += '"';
    var text = scanner.input.substring(startPos, scanner.pos);
    var value = JSON.parse(jsonLiteral);
    return { text: text, value: value };
  };

  // expose for testing
  Spacebars._$ = {
    parseNumber: parseNumber,
    parseIdentifierName: parseIdentifierName,
    parseStringLiteral: parseStringLiteral
  };
}());

//https://github.com/meteor/meteor/blob/devel/packages/spacebars-compiler/tojs.js
(function() {
  // Turns any JSONable value into a JavaScript literal.
  toJSLiteral = function (obj) {
    // See <http://timelessrepo.com/json-isnt-a-javascript-subset> for `\u2028\u2029`.
    // Also escape Unicode surrogates.
    return (JSON.stringify(obj)
            .replace(/[\u2028\u2029\ud800-\udfff]/g, function (c) {
              return '\\u' + ('000' + c.charCodeAt(0).toString(16)).slice(-4);
            }));
  };



  var jsReservedWordSet = (function (set) {
    _.each("abstract else instanceof super boolean enum int switch break export interface synchronized byte extends let this case false long throw catch final native throws char finally new transient class float null true const for package try continue function private typeof debugger goto protected var default if public void delete implements return volatile do import short while double in static with".split(' '), function (w) {
      set[w] = 1;
    });
    return set;
  })({});

  toObjectLiteralKey = function (k) {
    if (/^[a-zA-Z$_][a-zA-Z$0-9_]*$/.test(k) && jsReservedWordSet[k] !== 1)
      return k;
    return toJSLiteral(k);
  };

  // This method is generic, i.e. it can be transplanted to non-Tags
  // and it will still work by accessing `this.tagName`, `this.attrs`,
  // and `this.children`.  It's ok if `this.attrs` has content that
  // isn't allowed in an attribute (this feature is used by
  // HTMLTools.Special.prototype.toJS).
  HTML.Tag.prototype.toJS = function (options) {
    var argStrs = [];
    if (this.attrs) {
      var kvStrs = [];
      for (var k in this.attrs) {
        if (! HTML.isNully(this.attrs[k]))
          kvStrs.push(toObjectLiteralKey(k) + ': ' +
                      HTML.toJS(this.attrs[k], options));
      }
      if (kvStrs.length)
        argStrs.push('{' + kvStrs.join(', ') + '}');
    }

    for (var i = 0; i < this.children.length; i++) {
      argStrs.push(HTML.toJS(this.children[i], options));
    }

    var tagName = this.tagName;
    var tagSymbol;
    if (! (this instanceof HTML.Tag))
      // a CharRef or Comment, say
      tagSymbol = (tagName.indexOf('.') >= 0 ? tagName : 'HTML.' + tagName);
    else if (! HTML.isTagEnsured(tagName))
      tagSymbol = 'HTML.getTag(' + toJSLiteral(tagName) + ')';
    else
      tagSymbol = 'HTML.' + HTML.getSymbolName(tagName);

    return tagSymbol + '(' + argStrs.join(', ') + ')';
  };

  HTML.CharRef.prototype.toJS = function (options) {
    return HTML.Tag.prototype.toJS.call({tagName: "CharRef",
                                         attrs: {html: this.html,
                                                 str: this.str},
                                         children: []},
                                        options);
  };

  HTML.Comment.prototype.toJS = function (options) {
    return HTML.Tag.prototype.toJS.call({tagName: "Comment",
                                         attrs: null,
                                         children: [this.value]},
                                        options);
  };

  HTML.Raw.prototype.toJS = function (options) {
    return HTML.Tag.prototype.toJS.call({tagName: "Raw",
                                         attrs: null,
                                         children: [this.value]},
                                        options);
  };

  HTML.EmitCode.prototype.toJS = function (options) {
    return this.value;
  };

  HTML.toJS = function (node, options) {
    if (node == null) {
      // null or undefined
      return 'null';
    } else if ((typeof node === 'string') || (typeof node === 'boolean') || (typeof node === 'number')) {
      // string (or something that will be rendered as a string)
      return toJSLiteral(node);
    } else if (node instanceof Array) {
      // array
      var parts = [];
      for (var i = 0; i < node.length; i++)
        parts.push(HTML.toJS(node[i], options));
      return '[' + parts.join(', ') + ']';
    } else if (node.toJS) {
      // Tag or something else
      return node.toJS(options);
    } else {
      throw new Error("Expected tag, string, array, null, undefined, or " +
                      "object with a toJS method; found: " + node);
    }
  };
}());

//https://github.com/meteor/meteor/blob/devel/packages/spacebars-compiler/templatetag.js
(function() {
  // A TemplateTag is the result of parsing a single `{{...}}` tag.
  //
  // The `.type` of a TemplateTag is one of:
  //
  // - `"DOUBLE"` - `{{foo}}`
  // - `"TRIPLE"` - `{{{foo}}}`
  // - `"COMMENT"` - `{{! foo}}`
  // - `"INCLUSION"` - `{{> foo}}`
  // - `"BLOCKOPEN"` - `{{#foo}}`
  // - `"BLOCKCLOSE"` - `{{/foo}}`
  // - `"ELSE"` - `{{else}}`
  //
  // Besides `type`, the mandatory properties of a TemplateTag are:
  //
  // - `path` - An array of one or more strings.  The path of `{{foo.bar}}`
  //   is `["foo", "bar"]`.  Applies to DOUBLE, TRIPLE, INCLUSION, BLOCKOPEN,
  //   and BLOCKCLOSE.
  //
  // - `args` - An array of zero or more argument specs.  An argument spec
  //   is a two or three element array, consisting of a type, value, and
  //   optional keyword name.  For example, the `args` of `{{foo "bar" x=3}}`
  //   are `[["STRING", "bar"], ["NUMBER", 3, "x"]]`.  Applies to DOUBLE,
  //   TRIPLE, INCLUSION, and BLOCKOPEN.
  //
  // - `value` - For COMMENT tags, a string of the comment's text.
  //
  // These additional are typically set during parsing:
  //
  // - `position` - The HTMLTools.TEMPLATE_TAG_POSITION specifying at what sort
  //   of site the TemplateTag was encountered (e.g. at element level or as
  //   part of an attribute value). Its absence implies
  //   TEMPLATE_TAG_POSITION.ELEMENT.
  //
  // - `content` and `elseContent` - When a BLOCKOPEN tag's contents are
  //   parsed, they are put here.  `elseContent` will only be present if
  //   an `{{else}}` was found.

  var TEMPLATE_TAG_POSITION = HTMLTools.TEMPLATE_TAG_POSITION;

  TemplateTag = Spacebars.TemplateTag = function () {};

  var makeStacheTagStartRegex = function (r) {
    return new RegExp(r.source + /(?![{>!#/])/.source,
                      r.ignoreCase ? 'i' : '');
  };

  var starts = {
    ELSE: makeStacheTagStartRegex(/^\{\{\s*else(?=[\s}])/i),
    DOUBLE: makeStacheTagStartRegex(/^\{\{\s*(?!\s)/),
    TRIPLE: makeStacheTagStartRegex(/^\{\{\{\s*(?!\s)/),
    BLOCKCOMMENT: makeStacheTagStartRegex(/^\{\{\s*!--/),
    COMMENT: makeStacheTagStartRegex(/^\{\{\s*!/),
    INCLUSION: makeStacheTagStartRegex(/^\{\{\s*>\s*(?!\s)/),
    BLOCKOPEN: makeStacheTagStartRegex(/^\{\{\s*#\s*(?!\s)/),
    BLOCKCLOSE: makeStacheTagStartRegex(/^\{\{\s*\/\s*(?!\s)/)
  };

  var ends = {
    DOUBLE: /^\s*\}\}/,
    TRIPLE: /^\s*\}\}\}/
  };

  // Parse a tag from the provided scanner or string.  If the input
  // doesn't start with `{{`, returns null.  Otherwise, either succeeds
  // and returns a Spacebars.TemplateTag, or throws an error (using
  // `scanner.fatal` if a scanner is provided).
  TemplateTag.parse = function (scannerOrString) {
    var scanner = scannerOrString;
    if (typeof scanner === 'string')
      scanner = new HTMLTools.Scanner(scannerOrString);

    if (! (scanner.peek() === '{' &&
           (scanner.rest()).slice(0, 2) === '{{'))
      return null;

    var run = function (regex) {
      // regex is assumed to start with `^`
      var result = regex.exec(scanner.rest());
      if (! result)
        return null;
      var ret = result[0];
      scanner.pos += ret.length;
      return ret;
    };

    var advance = function (amount) {
      scanner.pos += amount;
    };

    var scanIdentifier = function (isFirstInPath) {
      var id = parseIdentifierName(scanner);
      if (! id)
        expected('IDENTIFIER');
      if (isFirstInPath &&
          (id === 'null' || id === 'true' || id === 'false'))
        scanner.fatal("Can't use null, true, or false, as an identifier at start of path");

      return id;
    };

    var scanPath = function () {
      var segments = [];

      // handle initial `.`, `..`, `./`, `../`, `../..`, `../../`, etc
      var dots;
      if ((dots = run(/^[\.\/]+/))) {
        var ancestorStr = '.'; // eg `../../..` maps to `....`
        var endsWithSlash = /\/$/.test(dots);

        if (endsWithSlash)
          dots = dots.slice(0, -1);

        _.each(dots.split('/'), function(dotClause, index) {
          if (index === 0) {
            if (dotClause !== '.' && dotClause !== '..')
              expected("`.`, `..`, `./` or `../`");
          } else {
            if (dotClause !== '..')
              expected("`..` or `../`");
          }

          if (dotClause === '..')
            ancestorStr += '.';
        });

        segments.push(ancestorStr);

        if (!endsWithSlash)
          return segments;
      }

      while (true) {
        // scan a path segment

        if (run(/^\[/)) {
          var seg = run(/^[\s\S]*?\]/);
          if (! seg)
            error("Unterminated path segment");
          seg = seg.slice(0, -1);
          if (! seg && ! segments.length)
            error("Path can't start with empty string");
          segments.push(seg);
        } else {
          var id = scanIdentifier(! segments.length);
          if (id === 'this') {
            if (! segments.length) {
              // initial `this`
              segments.push('.');
            } else {
              error("Can only use `this` at the beginning of a path.\nInstead of `foo.this` or `../this`, just write `foo` or `..`.");
            }
          } else {
            segments.push(id);
          }
        }

        var sep = run(/^[\.\/]/);
        if (! sep)
          break;
      }

      return segments;
    };

    // scan the keyword portion of a keyword argument
    // (the "foo" portion in "foo=bar").
    // Result is either the keyword matched, or null
    // if we're not at a keyword argument position.
    var scanArgKeyword = function () {
      var match = /^([^\{\}\(\)\>#=\s"'\[\]]+)\s*=\s*/.exec(scanner.rest());
      if (match) {
        scanner.pos += match[0].length;
        return match[1];
      } else {
        return null;
      }
    };

    // scan an argument; succeeds or errors.
    // Result is an array of two or three items:
    // type , value, and (indicating a keyword argument)
    // keyword name.
    var scanArg = function () {
      var keyword = scanArgKeyword(); // null if not parsing a kwarg
      var value = scanArgValue();
      return keyword ? value.concat(keyword) : value;
    };

    // scan an argument value (for keyword or positional arguments);
    // succeeds or errors.  Result is an array of type, value.
    var scanArgValue = function () {
      var startPos = scanner.pos;
      var result;
      if ((result = parseNumber(scanner))) {
        return ['NUMBER', result.value];
      } else if ((result = parseStringLiteral(scanner))) {
        return ['STRING', result.value];
      } else if (/^[\.\[]/.test(scanner.peek())) {
        return ['PATH', scanPath()];
      } else if ((result = parseIdentifierName(scanner))) {
        var id = result;
        if (id === 'null') {
          return ['NULL', null];
        } else if (id === 'true' || id === 'false') {
          return ['BOOLEAN', id === 'true'];
        } else {
          scanner.pos = startPos; // unconsume `id`
          return ['PATH', scanPath()];
        }
      } else {
        expected('identifier, number, string, boolean, or null');
      }
    };

    var type;

    var error = function (msg) {
      scanner.fatal(msg);
    };

    var expected = function (what) {
      error('Expected ' + what);
    };

    // must do ELSE first; order of others doesn't matter

    if (run(starts.ELSE)) type = 'ELSE';
    else if (run(starts.DOUBLE)) type = 'DOUBLE';
    else if (run(starts.TRIPLE)) type = 'TRIPLE';
    else if (run(starts.BLOCKCOMMENT)) type = 'BLOCKCOMMENT';
    else if (run(starts.COMMENT)) type = 'COMMENT';
    else if (run(starts.INCLUSION)) type = 'INCLUSION';
    else if (run(starts.BLOCKOPEN)) type = 'BLOCKOPEN';
    else if (run(starts.BLOCKCLOSE)) type = 'BLOCKCLOSE';
    else
      error('Unknown stache tag');

    var tag = new TemplateTag;
    tag.type = type;

    if (type === 'BLOCKCOMMENT') {
      var result = run(/^[\s\S]*?--\s*?\}\}/);
      if (! result)
        error("Unclosed block comment");
      tag.value = result.slice(0, result.lastIndexOf('--'));
    } else if (type === 'COMMENT') {
      var result = run(/^[\s\S]*?\}\}/);
      if (! result)
        error("Unclosed comment");
      tag.value = result.slice(0, -2);
    } else if (type === 'BLOCKCLOSE') {
      tag.path = scanPath();
      if (! run(ends.DOUBLE))
        expected('`}}`');
    } else if (type === 'ELSE') {
      if (! run(ends.DOUBLE))
        expected('`}}`');
    } else {
      // DOUBLE, TRIPLE, BLOCKOPEN, INCLUSION
      tag.path = scanPath();
      tag.args = [];
      var foundKwArg = false;
      while (true) {
        run(/^\s*/);
        if (type === 'TRIPLE') {
          if (run(ends.TRIPLE))
            break;
          else if (scanner.peek() === '}')
            expected('`}}}`');
        } else {
          if (run(ends.DOUBLE))
            break;
          else if (scanner.peek() === '}')
            expected('`}}`');
        }
        var newArg = scanArg();
        if (newArg.length === 3) {
          foundKwArg = true;
        } else {
          if (foundKwArg)
            error("Can't have a non-keyword argument after a keyword argument");
        }
        tag.args.push(newArg);

        if (run(/^(?=[\s}])/) !== '')
          expected('space');
      }
    }

    return tag;
  };

  // Returns a Spacebars.TemplateTag parsed from `scanner`, leaving scanner
  // at its original position.
  //
  // An error will still be thrown if there is not a valid template tag at
  // the current position.
  TemplateTag.peek = function (scanner) {
    var startPos = scanner.pos;
    var result = TemplateTag.parse(scanner);
    scanner.pos = startPos;
    return result;
  };

  // Like `TemplateTag.parse`, but in the case of blocks, parse the complete
  // `{{#foo}}...{{/foo}}` with `content` and possible `elseContent`, rather
  // than just the BLOCKOPEN tag.
  //
  // In addition:
  //
  // - Throws an error if `{{else}}` or `{{/foo}}` tag is encountered.
  //
  // - Returns `null` for a COMMENT.  (This case is distinguishable from
  //   parsing no tag by the fact that the scanner is advanced.)
  //
  // - Takes an HTMLTools.TEMPLATE_TAG_POSITION `position` and sets it as the
  //   TemplateTag's `.position` property.
  //
  // - Validates the tag's well-formedness and legality at in its position.
  TemplateTag.parseCompleteTag = function (scannerOrString, position) {
    var scanner = scannerOrString;
    if (typeof scanner === 'string')
      scanner = new HTMLTools.Scanner(scannerOrString);

    var startPos = scanner.pos; // for error messages
    var result = TemplateTag.parse(scannerOrString);
    if (! result)
      return result;

    if (result.type === 'BLOCKCOMMENT')
      return null;

    if (result.type === 'COMMENT')
      return null;

    if (result.type === 'ELSE')
      scanner.fatal("Unexpected {{else}}");

    if (result.type === 'BLOCKCLOSE')
      scanner.fatal("Unexpected closing template tag");

    position = (position || TEMPLATE_TAG_POSITION.ELEMENT);
    if (position !== TEMPLATE_TAG_POSITION.ELEMENT)
      result.position = position;

    if (result.type === 'BLOCKOPEN') {
      // parse block contents

      // Construct a string version of `.path` for comparing start and
      // end tags.  For example, `foo/[0]` was parsed into `["foo", "0"]`
      // and now becomes `foo,0`.  This form may also show up in error
      // messages.
      var blockName = result.path.join(',');

      var textMode = null;
        if (blockName === 'markdown' ||
            position === TEMPLATE_TAG_POSITION.IN_RAWTEXT) {
          textMode = HTML.TEXTMODE.STRING;
        } else if (position === TEMPLATE_TAG_POSITION.IN_RCDATA ||
                   position === TEMPLATE_TAG_POSITION.IN_ATTRIBUTE) {
          textMode = HTML.TEXTMODE.RCDATA;
        }
        var parserOptions = {
          getSpecialTag: TemplateTag.parseCompleteTag,
          shouldStop: isAtBlockCloseOrElse,
          textMode: textMode
        };
      result.content = HTMLTools.parseFragment(scanner, parserOptions);

      if (scanner.rest().slice(0, 2) !== '{{')
        scanner.fatal("Expected {{else}} or block close for " + blockName);

      var lastPos = scanner.pos; // save for error messages
      var tmplTag = TemplateTag.parse(scanner); // {{else}} or {{/foo}}

      if (tmplTag.type === 'ELSE') {
        // parse {{else}} and content up to close tag
        result.elseContent = HTMLTools.parseFragment(scanner, parserOptions);

        if (scanner.rest().slice(0, 2) !== '{{')
          scanner.fatal("Expected block close for " + blockName);

        lastPos = scanner.pos;
        tmplTag = TemplateTag.parse(scanner);
      }

      if (tmplTag.type === 'BLOCKCLOSE') {
        var blockName2 = tmplTag.path.join(',');
        if (blockName !== blockName2) {
          scanner.pos = lastPos;
          scanner.fatal('Expected tag to close ' + blockName + ', found ' +
                        blockName2);
        }
      } else {
        scanner.pos = lastPos;
        scanner.fatal('Expected tag to close ' + blockName + ', found ' +
                      tmplTag.type);
      }
    }

    var finalPos = scanner.pos;
    scanner.pos = startPos;
    validateTag(result, scanner);
    scanner.pos = finalPos;

    return result;
  };

  var isAtBlockCloseOrElse = function (scanner) {
    // Detect `{{else}}` or `{{/foo}}`.
    //
    // We do as much work ourselves before deferring to `TemplateTag.peek`,
    // for efficiency (we're called for every input token) and to be
    // less obtrusive, because `TemplateTag.peek` will throw an error if it
    // sees `{{` followed by a malformed tag.
    var rest, type;
    return (scanner.peek() === '{' &&
            (rest = scanner.rest()).slice(0, 2) === '{{' &&
            /^\{\{\s*(\/|else\b)/.test(rest) &&
            (type = TemplateTag.peek(scanner).type) &&
            (type === 'BLOCKCLOSE' || type === 'ELSE'));
  };

  // Validate that `templateTag` is correctly formed and legal for its
  // HTML position.  Use `scanner` to report errors. On success, does
  // nothing.
  var validateTag = function (ttag, scanner) {

    if (ttag.type === 'INCLUSION' || ttag.type === 'BLOCKOPEN') {
      var args = ttag.args;
      if (args.length > 1 && args[0].length === 2 && args[0][0] !== 'PATH') {
        // we have a positional argument that is not a PATH followed by
        // other arguments
        scanner.fatal("First argument must be a function, to be called on the rest of the arguments; found " + args[0][0]);
      }
    }

    var position = ttag.position || TEMPLATE_TAG_POSITION.ELEMENT;
    if (position === TEMPLATE_TAG_POSITION.IN_ATTRIBUTE) {
      if (ttag.type === 'DOUBLE') {
        return;
      } else if (ttag.type === 'BLOCKOPEN') {
        var path = ttag.path;
        var path0 = path[0];
        if (! (path.length === 1 && (path0 === 'if' ||
                                     path0 === 'unless' ||
                                     path0 === 'with' ||
                                     path0 === 'each'))) {
          scanner.fatal("Custom block helpers are not allowed in an HTML attribute, only built-in ones like #each and #if");
        }
      } else {
        scanner.fatal(ttag.type + " template tag is not allowed in an HTML attribute");
      }
    } else if (position === TEMPLATE_TAG_POSITION.IN_START_TAG) {
      if (! (ttag.type === 'DOUBLE')) {
        scanner.fatal("Reactive HTML attributes must either have a constant name or consist of a single {{helper}} providing a dictionary of names and values.  A template tag of type " + ttag.type + " is not allowed here.");
      }
      if (scanner.peek() === '=') {
        scanner.fatal("Template tags are not allowed in attribute names, only in attribute values or in the form of a single {{helper}} that evaluates to a dictionary of name=value pairs.");
      }
    }

  };
}());

//https://github.com/meteor/meteor/blob/devel/packages/spacebars-compiler/spacebars-compiler.js
(function() {
  Spacebars.parse = function (input) {

    var tree = HTMLTools.parseFragment(
      input,
      { getSpecialTag: TemplateTag.parseCompleteTag });

    return tree;
  };

  // ============================================================
  // Optimizer for optimizing HTMLjs into raw HTML string when
  // it doesn't contain template tags.

  var optimize = function (tree) {

    var pushRawHTML = function (array, html) {
      var N = array.length;
      if (N > 0 && (array[N-1] instanceof HTML.Raw)) {
        array[N-1] = HTML.Raw(array[N-1].value + html);
      } else {
        array.push(HTML.Raw(html));
      }
    };

    var isPureChars = function (html) {
      return (html.indexOf('&') < 0 && html.indexOf('<') < 0);
    };

    // Returns `null` if no specials are found in the array, so that the
    // parent can perform the actual optimization.  Otherwise, returns
    // an array of parts which have been optimized as much as possible.
    // `forceOptimize` forces the latter case.
    var optimizeArrayParts = function (array, optimizePartsFunc, forceOptimize) {
      var result = null;
      if (forceOptimize)
        result = [];
      for (var i = 0, N = array.length; i < N; i++) {
        var part = optimizePartsFunc(array[i]);
        if (part !== null) {
          // something special found
          if (result === null) {
            // This is our first special item.  Stringify the other parts.
            result = [];
            for (var j = 0; j < i; j++)
              pushRawHTML(result, HTML.toHTML(array[j]));
          }
          result.push(part);
        } else {
          // just plain HTML found
          if (result !== null) {
            // we've already found something special, so convert this to Raw
            pushRawHTML(result, HTML.toHTML(array[i]));
          }
        }
      }
      if (result !== null) {
        // clean up unnecessary HTML.Raw wrappers around pure character data
        for (var j = 0; j < result.length; j++) {
          if ((result[j] instanceof HTML.Raw) &&
              isPureChars(result[j].value))
            // replace HTML.Raw with simple string
            result[j] = result[j].value;
        }
      }
      return result;
    };

    var doesAttributeValueHaveSpecials = function (v) {
      if (v instanceof HTMLTools.Special)
        return true;
      if (typeof v === 'function')
        return true;

      if (v instanceof Array) {
        for (var i = 0; i < v.length; i++)
          if (doesAttributeValueHaveSpecials(v[i]))
            return true;
        return false;
      }

      return false;
    };

    var optimizeParts = function (node) {
      // If we have nothing special going on, returns `null` (so that the
      // parent can optimize).  Otherwise returns a replacement for `node`
      // with optimized parts.
      if ((node == null) || (typeof node === 'string') ||
          (node instanceof HTML.CharRef) || (node instanceof HTML.Comment) ||
          (node instanceof HTML.Raw)) {
        // not special; let parent decide how whether to optimize
        return null;
      } else if (node instanceof HTML.Tag) {
        var tagName = node.tagName;
        if (tagName === 'textarea' ||
            (! (HTML.isKnownElement(tagName) &&
                ! HTML.isKnownSVGElement(tagName)))) {
          // optimizing into a TEXTAREA's RCDATA would require being a little
          // more clever.  foreign elements like SVG can't be stringified for
          // innerHTML.
          return node;
        }

        var mustOptimize = false;

        // Avoid ever producing HTML containing `<table><tr>...`, because the
        // browser will insert a TBODY.  If we just `createElement("table")` and
        // `createElement("tr")`, on the other hand, no TBODY is necessary
        // (assuming IE 8+).
        if (tagName === 'table')
          mustOptimize = true;

        if (node.attrs && ! mustOptimize) {
          var attrs = node.attrs;
          for (var k in attrs) {
            if (doesAttributeValueHaveSpecials(attrs[k])) {
              mustOptimize = true;
              break;
            }
          }
        }

        var newChildren = optimizeArrayParts(node.children, optimizeParts, mustOptimize);

        if (newChildren === null)
          return null;

        var newTag = HTML.getTag(node.tagName).apply(null, newChildren);
        newTag.attrs = node.attrs;

        return newTag;

      } else if (node instanceof Array) {
        return optimizeArrayParts(node, optimizeParts);
      } else {
        return node;
      }
    };

    var optTree = optimizeParts(tree);
    if (optTree !== null)
      // tree was optimized in parts
      return optTree;

    optTree = HTML.Raw(HTML.toHTML(tree));

    if (isPureChars(optTree.value))
      return optTree.value;

    return optTree;
  };

  // ============================================================
  // Code-generation of template tags

  var builtInBlockHelpers = {
    'if': 'UI.If',
    'unless': 'UI.Unless',
    'with': 'Spacebars.With',
    'each': 'UI.Each'
  };

  // Some `UI.*` paths are special in that they generate code that
  // doesn't folow the normal lookup rules for dotted symbols. The
  // following names must be prefixed with `UI.` when you use them in a
  // template.
  var builtInUIPaths = {
    // `template` is a local variable defined in the generated render
    // function for the template in which `UI.contentBlock` (or
    // `UI.elseBlock`) is invoked. `template` is a reference to the
    // template itself.
    'contentBlock': 'template.__content',
    'elseBlock': 'template.__elseContent',

    // `Template` is the global template namespace. If you define a
    // template named `foo` in Spacebars, it gets defined as
    // `Template.foo` in JavaScript.
    'dynamic': 'Template.__dynamic'
  };

  // A "reserved name" can't be used as a <template> name.  This
  // function is used by the template file scanner.
  Spacebars.isReservedName = function (name) {
    return builtInBlockHelpers.hasOwnProperty(name);
  };

  var codeGenTemplateTag = function (tag) {
    if (tag.position === HTMLTools.TEMPLATE_TAG_POSITION.IN_START_TAG) {
      // only `tag.type === 'DOUBLE'` allowed (by earlier validation)
      return HTML.EmitCode('function () { return ' +
                           codeGenMustache(tag.path, tag.args, 'attrMustache')
                           + '; }');
    } else {
      if (tag.type === 'DOUBLE') {
        return HTML.EmitCode('function () { return ' +
                             codeGenMustache(tag.path, tag.args) + '; }');
      } else if (tag.type === 'TRIPLE') {
        return HTML.EmitCode('function () { return Spacebars.makeRaw(' +
                             codeGenMustache(tag.path, tag.args) + '); }');
      } else if (tag.type === 'INCLUSION' || tag.type === 'BLOCKOPEN') {
        var path = tag.path;

        if (tag.type === 'BLOCKOPEN' &&
            builtInBlockHelpers.hasOwnProperty(path[0])) {
          // if, unless, with, each.
          //
          // If someone tries to do `{{> if}}`, we don't
          // get here, but an error is thrown when we try to codegen the path.

          // Note: If we caught these errors earlier, while scanning, we'd be able to
          // provide nice line numbers.
          if (path.length > 1)
            throw new Error("Unexpected dotted path beginning with " + path[0]);
          if (! tag.args.length)
            throw new Error("#" + path[0] + " requires an argument");

          var codeParts = codeGenInclusionParts(tag);
          var dataFunc = codeParts.dataFunc; // must exist (tag.args.length > 0)
          var contentBlock = codeParts.content; // must exist
          var elseContentBlock = codeParts.elseContent; // may not exist

          var callArgs = [dataFunc, contentBlock];
          if (elseContentBlock)
            callArgs.push(elseContentBlock);

          return HTML.EmitCode(
            builtInBlockHelpers[path[0]] + '(' + callArgs.join(', ') + ')');

        } else {
          var compCode = codeGenPath(path, {lookupTemplate: true});

          if (path.length !== 1) {
            // path code may be reactive; wrap it
            compCode = 'function () { return ' + compCode + '; }';
          }

          var codeParts = codeGenInclusionParts(tag);
          var dataFunc = codeParts.dataFunc;
          var content = codeParts.content;
          var elseContent = codeParts.elseContent;

          var includeArgs = [compCode];
          if (content) {
            includeArgs.push(content);
            if (elseContent)
              includeArgs.push(elseContent);
          }

          var includeCode =
                'Spacebars.include(' + includeArgs.join(', ') + ')';

          if (dataFunc) {
            includeCode =
              'Spacebars.TemplateWith(' + dataFunc + ', UI.block(' +
              Spacebars.codeGen(HTML.EmitCode(includeCode)) + '))';
          }

          if (path[0] === 'UI' &&
              (path[1] === 'contentBlock' || path[1] === 'elseBlock')) {
            includeCode = 'UI.InTemplateScope(template, ' + includeCode + ')';
          }

          return HTML.EmitCode(includeCode);
        }
      } else {
        // Can't get here; TemplateTag validation should catch any
        // inappropriate tag types that might come out of the parser.
        throw new Error("Unexpected template tag type: " + tag.type);
      }
    }
  };

  var makeObjectLiteral = function (obj) {
    var parts = [];
    for (var k in obj)
      parts.push(toObjectLiteralKey(k) + ': ' + obj[k]);
    return '{' + parts.join(', ') + '}';
  };

  // `path` is an array of at least one string.
  //
  // If `path.length > 1`, the generated code may be reactive
  // (i.e. it may invalidate the current computation).
  //
  // No code is generated to call the result if it's a function.
  //
  // Options:
  //
  // - lookupTemplate {Boolean} If true, generated code also looks in
  //   the list of templates. (After helpers, before data context).
  //   Used when generating code for `{{> foo}}` or `{{#foo}}`. Only
  //   used for non-dotted paths.
  var codeGenPath = function (path, opts) {
    if (builtInBlockHelpers.hasOwnProperty(path[0]))
      throw new Error("Can't use the built-in '" + path[0] + "' here");
    // Let `{{#if UI.contentBlock}}` check whether this template was invoked via
    // inclusion or as a block helper, in addition to supporting
    // `{{> UI.contentBlock}}`.
    if (path.length >= 2 &&
        path[0] === 'UI' && builtInUIPaths.hasOwnProperty(path[1])) {
      if (path.length > 2)
        throw new Error("Unexpected dotted path beginning with " +
                        path[0] + '.' + path[1]);
      return builtInUIPaths[path[1]];
    }

    var args = [toJSLiteral(path[0])];
    var lookupMethod = 'lookup';
    if (opts && opts.lookupTemplate && path.length === 1)
      lookupMethod = 'lookupTemplate';
    var code = 'self.' + lookupMethod + '(' + args.join(', ') + ')';

    if (path.length > 1) {
      code = 'Spacebars.dot(' + code + ', ' +
        _.map(path.slice(1), toJSLiteral).join(', ') + ')';
    }

    return code;
  };

  // Generates code for an `[argType, argValue]` argument spec,
  // ignoring the third element (keyword argument name) if present.
  //
  // The resulting code may be reactive (in the case of a PATH of
  // more than one element) and is not wrapped in a closure.
  var codeGenArgValue = function (arg) {
    var argType = arg[0];
    var argValue = arg[1];

    var argCode;
    switch (argType) {
    case 'STRING':
    case 'NUMBER':
    case 'BOOLEAN':
    case 'NULL':
      argCode = toJSLiteral(argValue);
      break;
    case 'PATH':
      argCode = codeGenPath(argValue);
      break;
    default:
      // can't get here
      throw new Error("Unexpected arg type: " + argType);
    }

    return argCode;
  };

  // Generates a call to `Spacebars.fooMustache` on evaluated arguments.
  // The resulting code has no function literals and must be wrapped in
  // one for fine-grained reactivity.
  var codeGenMustache = function (path, args, mustacheType) {
    var nameCode = codeGenPath(path);
    var argCode = codeGenMustacheArgs(args);
    var mustache = (mustacheType || 'mustache');

    return 'Spacebars.' + mustache + '(' + nameCode +
      (argCode ? ', ' + argCode.join(', ') : '') + ')';
  };

  // returns: array of source strings, or null if no
  // args at all.
  var codeGenMustacheArgs = function (tagArgs) {
    var kwArgs = null; // source -> source
    var args = null; // [source]

    // tagArgs may be null
    _.each(tagArgs, function (arg) {
      var argCode = codeGenArgValue(arg);

      if (arg.length > 2) {
        // keyword argument (represented as [type, value, name])
        kwArgs = (kwArgs || {});
        kwArgs[arg[2]] = argCode;
      } else {
        // positional argument
        args = (args || []);
        args.push(argCode);
      }
    });

    // put kwArgs in options dictionary at end of args
    if (kwArgs) {
      args = (args || []);
      args.push('Spacebars.kw(' + makeObjectLiteral(kwArgs) + ')');
    }

    return args;
  };

  // Takes an inclusion tag and returns an object containing these properties,
  // all optional, whose values are JS source code:
  //
  // - `dataFunc` - source code of a data function literal
  // - `content` - source code of a content block
  // - `elseContent` - source code of an elseContent block
  //
  // Implements the calling convention for inclusions.
  var codeGenInclusionParts = function (tag) {
    var ret = {};

    if ('content' in tag) {
      ret.content = (
        'UI.block(' + Spacebars.codeGen(tag.content) + ')');
    }
    if ('elseContent' in tag) {
      ret.elseContent = (
        'UI.block(' + Spacebars.codeGen(tag.elseContent) + ')');
    }

    var dataFuncCode = null;

    var args = tag.args;
    if (! args.length) {
      // e.g. `{{#foo}}`
      return ret;
    } else if (args[0].length === 3) {
      // keyword arguments only, e.g. `{{> point x=1 y=2}}`
      var dataProps = {};
      _.each(args, function (arg) {
        var argKey = arg[2];
        dataProps[argKey] = 'Spacebars.call(' + codeGenArgValue(arg) + ')';
      });
      dataFuncCode = makeObjectLiteral(dataProps);
    } else if (args[0][0] !== 'PATH') {
      // literal first argument, e.g. `{{> foo "blah"}}`
      //
      // tag validation has confirmed, in this case, that there is only
      // one argument (`args.length === 1`)
      dataFuncCode = codeGenArgValue(args[0]);
    } else if (args.length === 1) {
      // one argument, must be a PATH
      dataFuncCode = 'Spacebars.call(' + codeGenPath(args[0][1]) + ')';
    } else {
      dataFuncCode = codeGenMustache(args[0][1], args.slice(1),
                                     'dataMustache');
    }

    ret.dataFunc = 'function () { return ' + dataFuncCode + '; }';

    return ret;
  };


  // ============================================================
  // Main compiler

  var replaceSpecials = function (node) {
    if (node instanceof HTML.Tag) {
      // potential optimization: don't always create a new tag
      var newChildren = _.map(node.children, replaceSpecials);
      var newTag = HTML.getTag(node.tagName).apply(null, newChildren);
      var oldAttrs = node.attrs;
      var newAttrs = null;

      if (oldAttrs) {
        _.each(oldAttrs, function (value, name) {
          if (name.charAt(0) !== '$') {
            newAttrs = (newAttrs || {});
            newAttrs[name] = replaceSpecials(value);
          }
        });

        if (oldAttrs.$specials && oldAttrs.$specials.length) {
          newAttrs = (newAttrs || {});
          newAttrs.$dynamic = _.map(oldAttrs.$specials, function (special) {
            return codeGenTemplateTag(special.value);
          });
        }
      }

      newTag.attrs = newAttrs;
      return newTag;
    } else if (node instanceof Array) {
      return _.map(node, replaceSpecials);
    } else if (node instanceof HTMLTools.Special) {
      return codeGenTemplateTag(node.value);
    } else {
      return node;
    }
  };

  Spacebars.compile = function (input, options) {
    var tree = Spacebars.parse(input);
    return Spacebars.codeGen(tree, options);
  };

  Spacebars.codeGen = function (parseTree, options) {
    // is this a template, rather than a block passed to
    // a block helper, say
    var isTemplate = (options && options.isTemplate);

    var tree = parseTree;

    // The flags `isTemplate` and `isBody` are kind of a hack.
    if (isTemplate || (options && options.isBody)) {
      // optimizing fragments would require being smarter about whether we are
      // in a TEXTAREA, say.
      tree = optimize(tree);
    }

    tree = replaceSpecials(tree);

    var code = '(function () { var self = this; ';
    if (isTemplate) {
      // support `{{> UI.contentBlock}}` and `{{> UI.elseBlock}}` with
      // lexical scope by creating a local variable in the
      // template's render function.
      code += 'var template = this; ';
    }
    code += 'return ';
    code += HTML.toJS(tree);
    code += '; })';

    code = beautify(code);

    return code;
  };

  var beautify = function (code) {
    if (Package.minifiers && Package.minifiers.UglifyJSMinify) {
      var result = UglifyJSMinify(code,
                                  { fromString: true,
                                    mangle: false,
                                    compress: false,
                                    output: { beautify: true,
                                              indent_level: 2,
                                              width: 80 } });
      var output = result.code;
      // Uglify interprets our expression as a statement and may add a semicolon.
      // Strip trailing semicolon.
      output = output.replace(/;$/, '');
      return output;
    } else {
      // don't actually beautify; no UglifyJS
      return code;
    }
  };

  // expose for compiler output tests
  Spacebars._beautify = beautify;
}());