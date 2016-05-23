
TARGETS = dtcloud-firefox.xpi dtcloud-chrome.zip dtcloud-chrome.crx

SRC = manifest.json \
      transform.js \
      popup.html \
      icon.png


PARENT = $(shell cd .. ; pwd | xargs cygpath -w)

all: $(TARGETS)

clean:
	rm -f $(TARGETS)

dtcloud-firefox.xpi: $(SRC)
	zip -r $@ $^

dtcloud-chrome.zip: $(SRC)
	zip -r $@ $^

dtcloud-chrome.crx: $(SRC)
	"/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" --pack-extension="$(PARENT)\src" --pack-extension-key="$(PARENT)\dtcloud.pem"
	mv "$(PARENT)\src.crx" $@

