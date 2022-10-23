
#
# Autor: mpragnarok
# [Repository of Logseq notes](https://github.com/mpragnarok/minasan-notes)
# [Instructions](https://mpragnarok.github.io/minasan-notes/#/page/publish%20logseq%20automatically)
#

.EXPORT_ALL_VARIABLES:
#
# var for Makefile to run database or some shared resources
#
SOURCE_VAULT = 
TARGET_VAULT = 

install-logseq-export:
	go install github.com/viktomas/logseq-export@latest

clean-bak:
	rm -rf ${TARGET_VAULT}/logseq/bak/pages/*
clean-assets:
	rm -rf ${TARGET_VAULT}/assets/*

clean-pages:
	rm -rf ${TARGET_VAULT}/pages/*

clean-all: clean-bak clean-assets clean-pages

logseq-export-assets:
	logseq-export \
		--graphPath ${SOURCE_VAULT}/pages \
		--blogFolder ${TARGET_VAULT}/pages \
		--unquotedProperties date,name,public,tags \
		--assetsRelativePath ../assets \
		--webAssetsPathPrefix ../assets

setup-and-export-assets: install-logseq-export logseq-export-assets

sleep-%:
	sleep $(@:sleep-%=%)

define grep-public
grep -lir 'public:: true' ./pages
endef

# `tar` avoid to use full path of directory
grep-public-markdown: 
	@$(grep-public) | tar -T - -c | tar -xpC ../logseq-public
	
	
clean-and-export-assets: clean-all logseq-export-assets 
clean-and-grep-public: clean-pages grep-public-markdown

# -i '' works with BSD and GNU sed
# [the solution of `sed` recursively in OSX version](https://www.cyberciti.biz/faq/unix-linux-replace-string-words-in-many-files/#comment-68305)
# Wrap the content with Custome tags: `- #+BEGIN_PRIVATE/` and `- #+END_PRIVATE`
find-and-remove-private-content:
	LC_ALL=C find ${TARGET_VAULT}/pages -type f | xargs -I@ sed -i '' '/^- #+BEGIN_PRIVATE/,/^- #+END_PRIVATE/d' @

get-shells:
	curl https://raw.githubusercontent.com/mpragnarok/learning/main/common/shells/logseq-publish.sh -o logseq-publish.sh
	curl https://raw.githubusercontent.com/mpragnarok/learning/main/common/shells/sync.sh -o ../logseq-public/sync.sh

get-workflow:
	mkdir -p ../logseq-public/.github/workflows && curl https://raw.githubusercontent.com/mpragnarok/learning/main/common/github/workflow/logseq-publish.yml -o ../logseq-public/.github/workflows/publish.yml

.PHONY: publish
publish:
	sh logseq-publish.sh && cd ${TARGET_VAULT} && sh sync.sh


