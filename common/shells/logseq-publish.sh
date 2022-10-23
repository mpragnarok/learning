#!/bin/bash

make clean-and-generate-assest && make clean-and-grep-public  && make find-and-remove-private-content -f Makefile || exit

